import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Hero, Campo, img } from '../components/ui.jsx'
import { produtos, brl, disponibilidade } from '../data/produtos.js'

export default function Produto() {
  const { id } = useParams()
  const nav = useNavigate()
  const p = produtos.find((x) => x.id === id)
  const [qtd, setQtd] = useState(1)

  // RF005: produto inexistente -> mensagem e volta ao catálogo
  useEffect(() => {
    if (p) return
    const t = setTimeout(() => nav('/catalogo', { replace: true }), 3000)
    return () => clearTimeout(t)
  }, [p, nav])

  if (!p) return <section className="wrap"><p className="alert bad" role="alert">Produto não encontrado ou indisponível. Você será levado ao <Link to="/catalogo">catálogo</Link>.</p></section>

  return (
    <>
      <Hero cls="h-sol"><h1 className="one">{p.nome}</h1></Hero>
      <section className="wrap detail">
        <img src={img(p.imagem)} alt={p.nome} />
        <div className="pg">
          <small>Código: {p.codigo} · {p.categoria}</small>
          <span className="preco">{brl(p.preco)}</span>
          <span className={`tag ${p.estoque ? '' : 'off'}`}>{disponibilidade(p)}{p.estoque ? ` (${p.estoque} un.)` : ''}</span>
          <p>{p.descricao}</p>
          <div className="tbl"><table><caption className="sr">Especificações técnicas</caption><tbody>
            {p.specs.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
          </tbody></table></div>
          <Campo id="qtd" label="Quantidade" type="number" min="1" max="999" value={qtd} onChange={(e) => setQtd(Math.max(1, +e.target.value || 1))} />
          <Link className="btn-p" to={`/orcamento?produto=${p.id}&qtd=${qtd}`}>Pedir orçamento</Link>
          <Link to="/catalogo">← Voltar ao catálogo</Link>
        </div>
      </section>
    </>
  )
}
