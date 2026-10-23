import { Link } from 'react-router-dom'
import { Hero, img } from '../components/ui.jsx'

const cats = [['robo-carga', 'Robôs industriais', 'Carregamento'], ['robo-palet', 'Robôs de paletização', 'Paletização'], ['robo-solda', 'Robôs de solda', 'Solda']]

export default function Inicio() {
  return (
    <>
      <Hero cls="h-home" brand>
        <span className="badge-y sm">Equipamentos Industriais</span>
        <h1>Máquinas industriais para a indústria automobilística</h1>
        <p>Instalação, treinamento, assistência técnica e fornecimento de peças originais. Pós-venda completo com a qualidade BR Robotics.</p>
      </Hero>
      <section className="wrap intro">
        <small>Máquinas</small>
        <h2>Robôs Industriais</h2>
        <p>A nova era de Robôs Industriais chega ao Brasil, e a BR Robotics fornece os equipamentos completos para você.</p>
        <div className="cats">
          {cats.map(([p, t, c]) => (
            <Link key={p} className="cat" to={`/catalogo?cat=${encodeURIComponent(c)}`}><img src={img(p)} alt={t} /><span>{t}</span></Link>
          ))}
        </div>
      </section>
    </>
  )
}
