import { Hero, Icon } from '../components/ui.jsx'

export default function Sobre() {
  return (
    <>
      <Hero cls="h-sobre">
        <small>Sobre nós</small>
        <h1>Sobre a BR Robotics</h1>
        <p>Desde 2000, a BR Robotics existe para atender o seu negócio na Indústria.</p>
      </Hero>
      <section className="wrap">
        <div className="stats">
          <div><b>26+</b>Anos de Experiência</div>
          <div><b>1200+</b>Linhas entregues</div>
          <div><Icon n="userOk" />Clientes Satisfeitos</div>
          <div><Icon n="globe" />América Latina</div>
        </div>
        <div className="story">
          <span className="badge-y">Começo da Glória</span>
          <h2>A História da BR Robotics</h2>
          <p>Em 2000, os engenheiros Helena Marques e Rodrigo Tavares, cansados de ver a fábrica onde trabalhavam depender de robôs importados caros e de manutenção lenta, decidiram criar a própria solução nacional, dando origem à BR Robotics.</p>
          <p>Começando numa garagem em Curitiba com R$ 40 mil, a dupla criou o protótipo &quot;Tatu&quot;, que após várias falhas conquistou a primeira venda e consolidou a reputação da empresa por robôs resistentes e suporte rápido.</p>
          <p>A empresa cresceu por indicação, atendendo diversos setores com robôs adaptados a cada cliente, e em 2008 abriu sua primeira fábrica, além de criar um programa para capacitar operários a trabalhar com os robôs.</p>
          <p>Hoje, a BR Robotics é uma das maiores fabricantes de robôs industriais da América Latina, e mantém a garagem original como museu, simbolizando a missão de provar que o Brasil pode criar sua própria tecnologia.</p>
        </div>
        <div className="mvv">
          <div><h3>Missão</h3><p>Desenvolver e fornecer soluções tecnológicas sob medida que aumentem a produtividade e a competitividade da indústria brasileira. Desta forma, fortalecendo o desenvolvimento econômico e industrial do país.</p></div>
          <div><h3>Visão</h3><p>Ser reconhecida como referência em máquinas e robótica industrial no Brasil e na América Latina, oferecendo produtos e serviços que geram resultados reais e contribuam com o sucesso de cada parceiro de negócios.</p></div>
          <div><h3>Valores</h3><ul>{['Relacionamento', 'Respeito', 'Integridade', 'Confiança', 'Excelência'].map((v) => <li key={v}>{v}</li>)}</ul></div>
        </div>
      </section>
    </>
  )
}
