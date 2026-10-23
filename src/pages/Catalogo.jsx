import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Hero, Campo, Alerta, img } from '../components/ui.jsx'
import { produtos, CATEGORIAS, brl, disponibilidade } from '../data/produtos.js'

const VALIDO = /^[\p{L}\p{N}\s.\-_/]*$/u
const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export default function Catalogo() {
  const [p] = useSearchParams()
  const [f, setF] = useState({ q: '', cat: p.get('cat') || '', disp: '' })
  const [ap, setAp] = useState(f)
  const [aviso, setAviso] = useState(null)
  const set = (e) => setF({ ...f, [e.target.name]: e.target.value })

  const buscar = (e) => {
    e.preventDefault()
    if (!VALIDO.test(f.q)) return setAviso('A pesquisa contém caracteres não permitidos. Use apenas letras, números e hífen.')
    setAviso(null); setAp(f)
  }

  let lista = [], erro = null
  try {
    const q = norm(ap.q.trim())
    lista = produtos.filter((x) =>
      (!q || norm(`${x.nome} ${x.codigo} ${x.descricao}`).includes(q)) &&
      (!ap.cat || x.categoria === ap.cat) &&
      (!ap.disp || (ap.disp === 'estoque') === (x.estoque > 0)))
  } catch { erro = 'Erro ao realizar a consulta. Tente novamente mais tarde.' }

  return (
    <>
      <Hero cls="h-sol"><h1 className="one">Catálogo de produtos</h1></Hero>
      <section className="wrap">
        <form className="search" onSubmit={buscar} noValidate role="search">
          <Campo id="q" label="Nome, código ou palavra-chave" placeholder="Ex.: ER8-0103-CW ou solda" value={f.q} onChange={set} erro={aviso} />
          <Campo id="cat" as="select" label="Categoria" value={f.cat} onChange={set}>
            <option value="">Todas</option>{CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
          </Campo>
          <Campo id="disp" as="select" label="Disponibilidade" value={f.disp} onChange={set}>
            <option value="">Todas</option><option value="estoque">Em estoque</option><option value="encomenda">Sob encomenda</option>
          </Campo>
          <button className="send" type="submit">Pesquisar</button>
        </form>
        <Alerta tipo="bad">{aviso || erro}</Alerta>
        {!erro && !lista.length && !aviso && <p className="alert info" role="status">Nenhum produto encontrado para a sua pesquisa.</p>}
        <div className="grid-p">
          {lista.map((x) => (
            <article className="card-p" key={x.id}>
              <img src={img(x.imagem)} alt={x.nome} loading="lazy" />
              <h3>{x.nome}</h3>
              <small>Código: {x.codigo}</small>
              <span className="preco">{brl(x.preco)}</span>
              <span className={`tag ${x.estoque ? '' : 'off'}`}>{disponibilidade(x)}</span>
              <p>{x.descricao}</p>
              <Link className="btn-p" to={`/produto/${x.id}`}>Ver detalhes</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
