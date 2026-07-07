#  Ju Scarabelli Crochê

<div align="center">
  <img src="https://github.com/juh1911/Juliana-Scarabelli-Arte-e-Croche/blob/main/public/fundo-home.jpg?raw=true" alt="Juliana Scarabelli Crochê Banner" width="100%" style="border-radius: 12px;"/>
  
  <p>
    <strong>E-commerce de produtos artesanais em crochê</strong><br/>
    Peças únicas feitas com amor e dedicação em cada ponto.
  </p>
</div>

---

## 📋 Sobre o Projeto

O **Juliana Scarabelli Crochê** é um e-commerce desenvolvido para a venda de produtos artesanais em crochê, localizado em Muriaé, Minas Gerais. O site foi criado para oferecer uma experiência de compra intuitiva, segura e agradável, valorizando o trabalho artesanal e a beleza de cada peça feita à mão.

O projeto foi desenvolvido como trabalho de conclusão de curso, com o objetivo de aplicar conhecimentos em desenvolvimento web e criar uma solução prática para o mercado de artesanato digital.

### 🎯 Objetivos

- **Geral:** Desenvolver um e-commerce completo para venda de produtos artesanais em crochê.
- **Específicos:**
  - Interface responsiva e minimalista no estilo "Matte Ceramic"
  - Sistema de autenticação de usuários (cadastro, login, recuperação de senha)
  - Catálogo de produtos com filtros por categoria
  - Carrinho de compras persistente
  - Checkout com integração ViaCEP
  - Painel administrativo completo
  - Sistema de avaliações de produtos
  - Modo escuro/claro

---

## 🚀 Tecnologias Utilizadas

### Front-end
| Tecnologia | Descrição |
|------------|-----------|
| **React** | Biblioteca para construção da interface |
| **Vite** | Build tool rápida e moderna |
| **JavaScript** | Linguagem principal do projeto |
| **CSS** | Estilização personalizada |
| **Framer Motion** | Animações suaves |
| **React Router** | Gerenciamento de rotas |
| **Lucide React** | Ícones |
| **Sonner** | Toasts/notificações |

### Back-end
| Tecnologia | Descrição |
|------------|-----------|
| **Supabase** | Backend como serviço |
| **PostgreSQL** | Banco de dados relacional |
| **Supabase Auth** | Autenticação de usuários |
| **Supabase Storage** | Armazenamento de imagens |

### APIs e Serviços
- **ViaCEP** - Busca automática de endereços por CEP
- **Vercel** - Hospedagem do site

---

## 📁 Estrutura do Projeto

📁 src/
├── 📁 components/
│ ├── Navbar.jsx # Menu de navegação
│ ├── Footer.jsx # Rodapé
│ ├── AdminRoute.jsx # Rota protegida admin
│ └── ...
├── 📁 contexts/
│ ├── Authcontext.jsx # Contexto de autenticação
│ └── CartContext.jsx # Contexto do carrinho
├── 📁 pages/
│ ├── Home.jsx # Página inicial
│ ├── Loja.jsx # Catálogo de produtos
│ ├── Produto.jsx # Detalhes do produto
│ ├── Carrinho.jsx # Carrinho de compras
│ ├── Checkout.jsx # Finalização da compra
│ ├── Login.jsx # Login
│ ├── Cadastro.jsx # Cadastro de usuário
│ ├── Perfil.jsx # Perfil do usuário
│ ├── MeusPedidos.jsx # Histórico de pedidos
│ ├── Admin.jsx # Painel administrativo
│ ├── AdminProduto.jsx # Gerenciar produtos
│ └── ...
├── 📁 services/
│ └── supabase.js # Configuração do Supabase
├── 📁 styles/
│ ├── App.css # Estilos globais
│ ├── Navbar.css # Estilos do menu
│ ├── Loja.css # Estilos da loja
│ ├── Login.css # Estilos do login
│ └── ...
└── 📄 main.jsx # Ponto de entrada

📁 public/
├── 📁 images/ # Imagens estáticas
└── 📄 favicon.ico

📄 vercel.json # Configuração Vercel
📄 package.json
📄 vite.config.js
📄 .env # Variáveis de ambiente
📄 README.md


---

## 🛠️ Funcionalidades

### 👤 Usuário
- **Cadastro:** Criação de conta com validação de senha forte
- **Login:** Autenticação com e-mail e senha
- **Perfil:** Edição de dados pessoais
- **Meus Pedidos:** Histórico completo de compras

### 🛍️ Loja
- **Catálogo:** Grid de produtos com imagens, preços e categorias
- **Filtros:** Por categoria (Decoração, Chaveiros, Bolsas, Vestuário)
- **Busca:** Pesquisa por nome do produto
- **Detalhes:** Página com informações completas do produto
- **Avaliações:** Sistema de avaliação com estrelas

### 🛒 Carrinho
- **Adicionar/Remover:** Controle de quantidade
- **Persistência:** Salva itens mesmo ao fechar o navegador
- **Cupons:** Aplicação de cupons de desconto
- **Resumo:** Cálculo automático de subtotal e total

### 📦 Checkout
- **Endereço:** Busca automática de CEP via ViaCEP
- **Resumo:** Visualização do pedido antes da finalização
- **Confirmação:** Número de pedido e resumo após finalizar

### 🔧 Admin
- **Dashboard:** Estatísticas de vendas, produtos e clientes
- **Produtos:** CRUD completo com upload de imagens
- **Pedidos:** Visualização e alteração de status
- **Clientes:** Lista de usuários cadastrados

---

👥 Autores
Julia Scarabelli Oliveira de Souza

Isadora Ferreira Martins

📄 Licença
Este projeto é de uso acadêmico e está sob a licença MIT.

🙏 Agradecimentos
Senai Distrito Federal - Pelo apoio e estrutura

Orientadores - Pela orientação e suporte

Familiares - Pelo incentivo e compreensão
