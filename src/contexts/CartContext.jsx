// src/contexts/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'
import { supabase } from '../services/supabase'

const CartContext = createContext({})

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [cupom, setCupom] = useState(null)
  const [descontoPercent, setDescontoPercent] = useState(0)
  const [cupomJaUsado, setCupomJaUsado] = useState(false)

  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('jsc_cart')
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart)
        if (Array.isArray(parsed)) {
          setCartItems(parsed)
        }
      } catch (e) {
        console.error('Erro ao carregar carrinho:', e)
      }
    }
  }, [])

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('jsc_cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Adicionar item ao carrinho
  const addItem = (product, quantity = 1) => {
    if (!product || !product.id) {
      console.error('Produto inválido:', product)
      return
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.id)
      
      if (existingItem) {
        const newQuantity = existingItem.quantidade + quantity
        
        if (newQuantity > product.estoque) {
          toast.warning(`Estoque insuficiente. Temos apenas ${product.estoque} peças.`)
          return prevItems
        }
        
        toast.success(`${product.nome} - quantidade atualizada para ${newQuantity}!`)
        return prevItems.map(item =>
          item.productId === product.id
            ? { ...item, quantidade: newQuantity }
            : item
        )
      } else {
        if (quantity > product.estoque) {
          toast.warning(`Estoque insuficiente. Temos apenas ${product.estoque} peças.`)
          return prevItems
        }
        
        toast.success(`🎉 ${product.nome} adicionado ao carrinho!`)
        return [...prevItems, {
          productId: product.id,
          nome: product.nome,
          preco: product.preco,
          imagem: product.imagem || '🧶',
          quantidade: quantity,
          estoque: product.estoque
        }]
      }
    })
  }

  // Remover item do carrinho
  const removeItem = (productId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => i.productId === productId)
      if (item) {
        toast.info(`${item.nome} removido do carrinho`)
      }
      return prevItems.filter(item => item.productId !== productId)
    })
  }

  // Atualizar quantidade de um item
  const updateQuantity = (productId, quantidade) => {
    if (quantidade <= 0) {
      removeItem(productId)
      return
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId ? { ...item, quantidade } : item
      )
    )
  }

  // Limpar carrinho completamente
  const clearCart = () => {
    setCartItems([])
    setCupom(null)
    setDescontoPercent(0)
    setCupomJaUsado(false)
    localStorage.removeItem('jsc_cart')
    toast.info('Carrinho esvaziado')
  }

  // 🔥 VERIFICAR SE O USUÁRIO JÁ USOU O CUPOM
  const verificarCupomUsado = async (usuarioId, cupomCodigo) => {
    try {
      // Buscar o ID do cupom
      const { data: cupomData, error: cupomError } = await supabase
        .from('cupons')
        .select('id')
        .eq('codigo', cupomCodigo)
        .single()

      if (cupomError || !cupomData) {
        console.error('Erro ao buscar cupom:', cupomError)
        return false
      }

      // Verificar se o usuário já usou este cupom
      const { data: usoData, error: usoError } = await supabase
        .from('cupons_uso')
        .select('id')
        .eq('usuario_id', usuarioId)
        .eq('cupom_id', cupomData.id)
        .single()

      if (usoError && usoError.code !== 'PGRST116') {
        console.error('Erro ao verificar uso do cupom:', usoError)
        return false
      }

      return !!usoData
    } catch (error) {
      console.error('Erro ao verificar cupom:', error)
      return false
    }
  }

  // 🔥 REGISTRAR USO DO CUPOM
  const registrarUsoCupom = async (usuarioId, cupomCodigo) => {
    try {
      const { data: cupomData } = await supabase
        .from('cupons')
        .select('id')
        .eq('codigo', cupomCodigo)
        .single()

      if (!cupomData) return false

      const { error } = await supabase
        .from('cupons_uso')
        .insert([
          { usuario_id: usuarioId, cupom_id: cupomData.id, usado: true }
        ])

      if (error) {
        console.error('Erro ao registrar uso do cupom:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Erro ao registrar cupom:', error)
      return false
    }
  }

  // 🔥 APLICAR CUPOM (com verificação de uso único)
  const applyCupom = async (codigo, usuarioId) => {
    const codigoUpper = codigo.toUpperCase()
    const cupomValido = codigoUpper === 'PRIMEIRA10'
    
    if (!cupomValido) {
      toast.error('Cupom inválido')
      return false
    }

    // Se o usuário está logado, verificar se já usou o cupom
    if (usuarioId) {
      const jaUsou = await verificarCupomUsado(usuarioId, codigoUpper)
      if (jaUsou) {
        toast.error('Você já utilizou este cupom!')
        return false
      }
    }

    setCupom(codigoUpper)
    setDescontoPercent(10)
    setCupomJaUsado(false)
    toast.success('Cupom PRIMEIRA10 aplicado! 10% de desconto')
    return true
  }

  // 🔥 MARCAR CUPOM COMO USADO (chamar no checkout após finalizar pedido)
  const marcarCupomComoUsado = async (usuarioId) => {
    if (!cupom || !usuarioId) return false
    
    const result = await registrarUsoCupom(usuarioId, cupom)
    if (result) {
      setCupomJaUsado(true)
      toast.info('Cupom registrado com sucesso!')
    }
    return result
  }

  // Remover cupom
  const removeCupom = () => {
    setCupom(null)
    setDescontoPercent(0)
    toast.info('Cupom removido')
  }

  // Calcular subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.preco * item.quantidade),
    0
  )

  // Calcular valor do desconto
  const desconto = (subtotal * descontoPercent) / 100

  // Calcular total final
  const total = subtotal - desconto

  // Calcular quantidade total de itens no carrinho
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantidade, 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      subtotal,
      desconto,
      total,
      descontoPercent,
      cupom,
      cupomJaUsado,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyCupom,
      removeCupom,
      marcarCupomComoUsado
    }}>
      {children}
    </CartContext.Provider>
  )
}