import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Hero, Campo, Alerta } from '../components/ui.jsx'
import { acompanhar, fmt, sols } from '../lib/db.js'
import { useAuth } from '../lib/auth.jsx'

export default function Historico() {
  const { user } = useAuth()
  const [estado, setEstado] = useState('')
  let lista = [], erro = null
  try {
    lista = sols().filter((s) => s.userId === user.id).map(acompanhar).sort((a, b) => b.criadoEm - a.criadoEm)
  } catch { erro = 'Não foi possível carregar o histórico. Tente novamente em instantes.' }
  const total = lista.length
  lista = lista.filter((s) => !estado || s.estado === estado)

  return (
    <>
      <Hero cls="h-orc"><h1 className="one">Minhas solicitações</h1></Hero>
      <section className="wrap pg">
        <Alerta tipo="bad">{erro}</Alerta>
        {!erro && !total && <p className="alert info" role="status">Ainda não realizou qualquer solicitação. <Link to="/orcamento">Peça seu primeiro orçamento</Link>.</p>}
        {!!total && (
          <>
            <Campo id="estado" as="select" label="Filtrar por estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="">Todos</option><option>Recebida</option><option>Em análise</option><option>Respondida</option>
            </Campo>
            <div className="tbl"><table>
              <thead><tr><th>Protocolo</th><th>Data</th><th>Tipo</th><th>Estado</th><th><span className="sr">Ações</span></th></tr></thead>
              <tbody>{lista.map((s) => (
                <tr key={s.protocolo}><td>{s.protocolo}</td><td>{fmt(s.criadoEm)}</td><td>{s.tipo}</td><td>{s.estado}</td>
                  <td><Link to={`/acompanhar?protocolo=${s.protocolo}`}>Ver detalhes</Link></td></tr>
              ))}</tbody>
            </table></div>
          </>
        )}
      </section>
    </>
  )
}
