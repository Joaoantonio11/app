import { Hero, img } from '../components/ui.jsx'

const labels = ['Número de eixos:', 'Grau de proteção IP:', 'Instalação:', 'Alcance do braço:', 'Carga máxima:', 'Peso do corpo:']
const produtos = [
  { pic: 'robo-carga', cod: 'ER8-0103-CW', tipo: 'carregar', rows: ['6', 'IP54', 'Piso', '2800mm', '700kg', '2930kg'] },
  { pic: 'robo-solda', cod: 'ER8-2000-CW', tipo: 'solda', rows: ['6', 'IP54', 'Piso/Teto', '2800mm', '8kg', '281kg'] },
]

export default function EmAlta() {
  return (
    <>
      <Hero cls="h-alta"><h1 className="one c">Produtos em alta</h1></Hero>
      <section className="wrap prods">
        {produtos.map((p) => (
          <article className="prod" key={p.cod}>
            <div className="prod-top">
              <img src={img(p.pic)} alt={p.cod} />
              <div>
                <h3>Descrição do produto:</h3>
                <p>{p.cod} é um robô de {p.tipo} com 6 eixos, carga máxima de 8kg, alcance de 2010mm. Instalação: Piso/Teto.</p>
                <h3>Características Técnicas:</h3>
              </div>
            </div>
            <dl className="specs">
              {labels.map((l, i) => <div key={l} style={{ display: 'contents' }}><dt>{l}</dt><dd>{p.rows[i]}</dd></div>)}
              <dt>Segmentos:</dt><dd>Indústria Metalúrgica, Indústria Metalmecânica</dd>
            </dl>
          </article>
        ))}
      </section>
    </>
  )
}
