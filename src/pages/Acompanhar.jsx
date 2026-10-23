import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Hero, Campo, Alerta } from '../components/ui.jsx'
import { acompanhar, fmt, sols } from '../lib/db.js'
import { useAuth } from '../lib/auth.jsx'

export default function Acompanhar() {
  const { user } = useAuth()
  const [p, setP] = useSearchParams()
  const protocolo = p.get('protocolo')
  const [cod, setCod] = useState(protocolo || '')
  const [aviso, setAviso] = useState(null)

  let res = null, erro = null, privada = false
  if (protocolo) {
    try {
      const s = sols().find((x) => x.protocolo === protocolo.trim().toUpperCase())
      if (!s) erro = 'Solicitação não encontrada. Verifique o número digitado.'
      else if (s.userId && s.userId !== user?.id) privada = true
      else res = acompanhar(s)
    } catch { erro = 'Erro ao carregar o histórico. Tente novamente mais tarde.' }
  }
  const minhas = user ? sols().filter((s) => s.userId === user.id).sort((a, b) => b.criadoEm - a.criadoEm) : []

  const consultar = (e) => {
    e.preventDefault()
    if (!cod.trim()) return setAviso('Informe o número de protocolo (ex.: ORC-12345678).')
    setAviso(null); setP({ protocolo: cod.trim().toUpperCase() })
  }

  return (
    <>
      <Hero cls="h-orc"><h1 className="one">Acompanhar solicitação</h1></Hero>
      <section className="wrap form-wrap pg">
        <form className="search" onSubmit={consultar} noValidate>
          <Campo id="cod" label="Número de protocolo" placeholder="ORC-00000000" value={cod} onChange={(e) => setCod(e.target.value)} erro={aviso} />
          <span /><span /><button className="send" type="submit">Consultar</button>
        </form>
        <Alerta tipo="bad">{aviso || erro}</Alerta>
        {privada && <p className="alert bad" role="alert">Esta solicitação é privada. <Link to="/login" state={{ from: '/acompanhar' }}>Entre na conta</Link> que a criou para consultá-la.</p>}
        {res && (
          <article className="card-p">
            <h2>{res.protocolo} — {res.estado}</h2>
            <p>Aberta em {fmt(res.criadoEm)} · Assunto: {res.assunto}</p>
            <p>Itens: {res.itens.map((i) => `${i.nome} (${i.qtd})`).join(', ')}</p>
            {res.resposta && <p className="alert ok" role="status"><strong>Resposta da empresa:</strong> {res.resposta}</p>}
            <h3>Histórico de atualizações</h3>
            <ol className="tl">{[...res.historico].reverse().map((h) => <li key={h.t}><strong>{h.estado}</strong> — {fmt(h.t)}<br />{h.msg}</li>)}</ol>
          </article>
        )}
        {!!minhas.length && (
          <div>
            <h2 className="ttl">Suas solicitações</h2>
            <ul className="tl">{minhas.map((s) => <li key={s.protocolo}><button className="lnk dark" onClick={() => { setCod(s.protocolo); setP({ protocolo: s.protocolo }) }}>Ver detalhes de {s.protocolo}</button> — {fmt(s.criadoEm)}</li>)}</ul>
          </div>
        )}
      </section>
    </>
  )
}
