import { Link } from 'react-router-dom'
import { Hero, Band } from '../components/ui.jsx'

export default function Servicos() {
  return (
    <>
      <Hero cls="h-serv"><h1 className="one">Serviços Técnicos e peças de alta qualidade</h1></Hero>
      <section className="wrap bands">
        <Band cls="b1" pic="atendimento" alt="Técnico sorrindo de capacete">
          <h2 className="y">Atendimento<br />Pós-venda completo,<br />com a excelência BR Robotics</h2>
          <p>Mais do que vender máquinas, a BR Robotics oferece suporte técnico essencial, garantindo que cada equipamento entregue o máximo de sua performance ao longo dos anos.</p>
        </Band>
        <Band cls="b2 rev" pic="pecas" alt="Operário manuseando peça">
          <h2>Fornecimento de peças de reposição</h2>
          <p>Aqui na BR Robotics temos peças originais para você manter seu equipamento sempre no padrão correto</p>
          <Link className="btn-w" to="/orcamento">Cotar peças de reposição</Link>
        </Band>
        <Band cls="b3" pic="robo-solda" alt="Robô de solda amarelo">
          <h2>Entrega de robôs industriais</h2>
          <p>A BR Robotics tem os melhores robôs que a industria pode oferecer para o seu negócio florescer</p>
          <Link className="btn-w" to="/orcamento">Solicitar entrega</Link>
        </Band>
      </section>
    </>
  )
}
