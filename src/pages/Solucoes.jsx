import { Hero, Band } from '../components/ui.jsx'

export default function Solucoes() {
  return (
    <>
      <Hero cls="h-sol"><h1>Nossas soluções</h1><p>Para os seus problemas</p></Hero>
      <section className="wrap bands">
        <Band cls="b4" pic="treinamento" alt="Equipe em treinamento na fábrica">
          <h2>Treinamento de Equipes</h2>
          <p>Aqui na BR Robotics oferecemos treinamento para os seus funcionários sobre o funcionamento das maquinas</p>
          <ul className="dots"><li>Oferecemos aulas online intuitivas</li><li>Mandamos os nossos melhores treinadores para sua empresa</li></ul>
        </Band>
        <Band cls="b5 rev" pic="assistencia" alt="Técnica anotando em prancheta">
          <h2>Assistência Técnica</h2>
          <p>Seu equipamento não funciona como devia, não tem o pessoal necessário para manutenção?</p>
          <p>Não se preocupe, a BR Robotics tem funcionarios especializados prontos para te ajudar</p>
        </Band>
      </section>
    </>
  )
}
