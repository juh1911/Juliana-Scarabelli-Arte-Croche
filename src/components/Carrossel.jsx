// src/components/Carrossel.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../styles/Carrossel.css'

function Carrossel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const slides = [
    {
      id: 1,
      title: ' Ju Scarabelli',
      subtitle: 'Arte & Crochê',
      image: '/fundo-home.jpg',
      link: '/loja?categoria=Amigurumi',
      cta: 'Visitar Loja'
    },
    {
      id: 2,
      title: 'Promoção Especial',
      subtitle: '10% OFF com cupom PRIMEIRA10',
      image: '/fundo-home.jpg',
      link: '/loja',
      cta: 'Ver promoções'
    },
    {
      id: 3,
      title: 'Feito à Mão',
      subtitle: 'Cada peça é única e especial',
      image: '/fundo-home.jpg',
      link: '/sobre',
      cta: 'Conheça nossa história'
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex])

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <div 
      className="carrossel-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carrossel-slide-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="carrossel-slide-full"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="carrossel-background-full"
              style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
            />
            <div className="carrossel-overlay-full"></div>
            <div className="carrossel-content-full">
              <motion.h2 
                className="carrossel-title-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {slides[currentIndex].title}
              </motion.h2>
              <motion.p 
                className="carrossel-subtitle-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {slides[currentIndex].subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Link 
                  to={slides[currentIndex].link} 
                  className="carrossel-btn-full"
                >
                  {slides[currentIndex].cta} →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button className="carrossel-btn-nav-full prev" onClick={prevSlide}>
        <ChevronLeft size={32} />
      </button>
      <button className="carrossel-btn-nav-full next" onClick={nextSlide}>
        <ChevronRight size={32} />
      </button>

      <div className="carrossel-dots-full">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carrossel-dot-full ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Carrossel