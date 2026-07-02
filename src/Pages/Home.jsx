// src/Pages/Home.jsx
import Carrossel from '../components/Carrossel'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home-container">
      {/* 🎠 APENAS O CARROSSEL - SEM CONTEÚDO SOBREPOSTO */}
      <Carrossel />
    </div>
  )
}

export default Home