// src/Pages/Perfil.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MapPin, Calendar, Mail, Pencil, X, 
  Package, ShoppingBag, LogOut
} from 'lucide-react'
import { useAuth } from '../contexts/Authcontext'
import { supabase } from '../services/supabase'
import { toast, Toaster } from 'sonner'
import '../styles/Perfil.css'

function Perfil() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const [editarPerfil, setEditarPerfil] = useState(false)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cidade, setCidade] = useState('')
  const [loading, setLoading] = useState(true)
  
  const [totalPedidos, setTotalPedidos] = useState(0)
  const [totalCompras, setTotalCompras] = useState(0)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    async function carregarDados() {
      // Carregar perfil
      const { data: perfilData, error: perfilError } = await supabase
        .from('perfis')
        .select('*')
        .eq('id', user.id)
        .single()

      if (perfilError) {
        console.error('Erro ao carregar perfil:', perfilError)
      } else if (perfilData) {
        setNome(perfilData.nome || '')
        setTelefone(perfilData.telefone || '')
        setCidade(perfilData.cidade || '')
      }

      // Buscar TOTAL DE PEDIDOS
      const { data: pedidosData, error: pedidosError } = await supabase
        .from('pedidos')
        .select('id')
        .eq('usuario_id', user.id)
        .neq('status', 'cancelado')

      if (pedidosError) {
        console.error('Erro ao carregar pedidos:', pedidosError)
      } else {
        setTotalPedidos(pedidosData?.length || 0)
      }

      // Buscar TOTAL DE COMPRAS
      const { data: comprasData, error: comprasError } = await supabase
        .from('pedidos')
        .select('total')
        .eq('usuario_id', user.id)
        .neq('status', 'cancelado')

      if (comprasError) {
        console.error('Erro ao carregar compras:', comprasError)
      } else {
        const soma = comprasData?.reduce((acc, item) => acc + (item.total || 0), 0) || 0
        setTotalCompras(soma)
      }

      setLoading(false)
    }

    carregarDados()
  }, [user, navigate])

  const handleSalvarPerfil = async () => {
    const { error } = await supabase
      .from('perfis')
      .update({
        nome,
        telefone,
        cidade
      })
      .eq('id', user.id)

    if (error) {
      console.error('Erro ao salvar:', error)
      toast.error('Erro ao atualizar perfil')
    } else {
      toast.success('Perfil atualizado!')
      setEditarPerfil(false)
      const updatedUser = { ...user, nome }
      localStorage.setItem('jsc_current_user', JSON.stringify(updatedUser))
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) return null

  const estatisticas = [
    { label: 'Pedidos', valor: totalPedidos, icon: Package },
    { label: 'Compras', valor: `R$ ${totalCompras.toFixed(2)}`, icon: ShoppingBag },
  ]

  return (
    <div className="perfil-page">
      <Toaster position="top-right" richColors />
      
      <div className="perfil-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="perfil-header">
            <h1 className="perfil-title">Meu Perfil</h1>
            <p className="perfil-subtitle">Gerencie suas informações</p>
          </div>

          <div className="perfil-card">
            <div className="perfil-capa"></div>

            <div className="perfil-conteudo">
              <div className="perfil-topo">
                <div className="perfil-avatar">
                  {nome?.[0] || user?.email?.[0] || 'U'}
                </div>
                <div className="perfil-info">
                  <h2 className="perfil-nome">{nome || 'Usuário'}</h2>
                  <p className="perfil-email">{user?.email}</p>
                </div>
                <button 
                  className="perfil-editar-btn"
                  onClick={() => setEditarPerfil(true)}
                >
                  <Pencil size={16} />
                  Editar
                </button>
              </div>

              <div className="perfil-detalhes">
                <div className="perfil-detalhe">
                  <MapPin size={16} />
                  <span>{cidade || 'Cidade não informada'}</span>
                </div>
                <div className="perfil-detalhe">
                  <Mail size={16} />
                  <span>{user?.email}</span>
                </div>
                <div className="perfil-detalhe">
                  <Calendar size={16} />
                  <span>Cliente desde 2026</span>
                </div>
              </div>

              <div className="perfil-estatisticas">
                {estatisticas.map((item, index) => (
                  <div key={index} className="perfil-estatistica">
                    <item.icon size={20} />
                    <div>
                      <span className="valor">{item.valor}</span>
                      <span className="label">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="perfil-acoes">
            <button 
              className="perfil-acao"
              onClick={() => navigate('/meus-pedidos')}
            >
              <Package size={20} />
              <span>Meus Pedidos</span>
            </button>
            <button 
              className="perfil-acao"
              onClick={() => navigate('/loja')}
            >
              <ShoppingBag size={20} />
              <span>Continuar Comprando</span>
            </button>
            <button 
              className="perfil-acao sair"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </motion.div>
      </div>

      {editarPerfil && (
        <div className="perfil-modal-overlay" onClick={() => setEditarPerfil(false)}>
          <div className="perfil-modal" onClick={(e) => e.stopPropagation()}>
            <div className="perfil-modal-header">
              <h3>Editar Perfil</h3>
              <button onClick={() => setEditarPerfil(false)} className="perfil-modal-fechar">
                <X size={20} />
              </button>
            </div>

            <div className="perfil-modal-body">
              <div className="perfil-modal-campo">
                <label>Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                />
              </div>

              <div className="perfil-modal-campo">
                <label>Telefone</label>
                <input
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="perfil-modal-campo">
                <label>Cidade</label>
                <input
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Sua cidade"
                />
              </div>
            </div>

            <div className="perfil-modal-footer">
              <button 
                className="perfil-modal-cancelar"
                onClick={() => setEditarPerfil(false)}
              >
                Cancelar
              </button>
              <button 
                className="perfil-modal-salvar"
                onClick={handleSalvarPerfil}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Perfil