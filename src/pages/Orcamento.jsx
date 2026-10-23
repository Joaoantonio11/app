import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Hero, Campo } from '../components/ui.jsx'
import { produtos } from '../data/produtos.js'
import { sols, saveSols } from '../lib/db.js'
import { useAuth } from '../lib/auth.jsx'

const SERV = ['Treinamento de equipes', 'Assistência técnica', 'Peças de reposição']
const OPCOES = [...produtos.map((p) => ({ id: p.id, nome: p.nome })), ...SERV.map((n) => ({ id: n, nome: n }))]
const OBRIG = ['assunto', 'nome', 'email', 'telefone', 'empresa', 'cnpj', 'cidade', 'uf']
const linhas = [
  [['nome', 'Nome *', 'user', 'Digite seu nome'], ['email', 'E-mail *', 'mail', 'Digite seu e-mail', 'email'], ['telefone', 'Telefone *', 'wa', '(00) 0000-0000', 'tel']],
  [['empresa', 'Empresa *', 'screen', 'Informe a empresa'], ['cnpj', 'CNPJ da Empresa *', 'doc', 'Informe o CNPJ']],
  [['cidade', 'Sua cidade*', 'pin', 'Informe a cidade'], ['uf', 'Seu UF*', 'pin', 'Informe o UF']],
]

export default function Orcamento() {
  const { user } = useAuth()
  const [p] = useSearchParams()
  const [v, setV] = useState({ assunto: '', nome: user?.nome || '', email: user?.email || '', telefone: user?.telefone || '', empresa: user?.empresa || '', cnpj: '', cidade: '', uf: '', obs: '' })
  const [sel, setSel] = useState(() => (p.get('produto') ? { [p.get('produto')]: Math.max(1, +p.get('qtd') || 1) } : {}))
  const [erros, setErros] = useState({})
  const [msg, setMsg] = useState(null)
  const set = (e) => setV({ ...v, [e.target.name]: e.target.value })
  const toggle = (id) => setSel((s) => { const n = { ...s }; if (id in n) delete n[id]; else n[id] = 1; return n })

  const enviar = (e) => {
    e.preventDefault()
    const er = {}
    OBRIG.forEach((k) => { if (!v[k].trim()) er[k] = true })
    setErros(er)
    if (Object.keys(er).length) return setMsg({ ok: false, t: 'Por favor, preencha todos os campos obrigatórios.' })
    if (!/^\S+@\S+\.\S+$/.test(v.email)) { setErros({ email: true }); return setMsg({ ok: false, t: 'O e-mail informado é inválido. Confira se há "@" e o domínio.' }) }
    if (!Object.keys(sel).length) return setMsg({ ok: false, t: 'Selecione ao menos um produto ou serviço para solicitar o orçamento.' })
    try {
      const protocolo = 'ORC-' + Date.now().toString().slice(-8)
      saveSols([...sols(), { protocolo, userId: user?.id ?? null, criadoEm: Date.now(), tipo: 'Orçamento', assunto: v.assunto, contato: { nome: v.nome, email: v.email, telefone: v.telefone, empresa: v.empresa },
        itens: OPCOES.filter((o) => o.id in sel).map((o) => ({ nome: o.nome, qtd: sel[o.id] })), obs: v.obs }])
      setMsg({ ok: true, protocolo, t: `Solicitação enviada! Protocolo: ${protocolo}. Uma confirmação será enviada para ${v.email}.` })
      setV({ ...v, assunto: '', cnpj: '', cidade: '', uf: '', obs: '' }); setSel({})
    } catch {
      setMsg({ ok: false, t: 'Não foi possível enviar agora. Verifique sua conexão e tente novamente mais tarde.' })
    }
  }

  return (
    <>
      <Hero cls="h-orc"><h1 className="one">Orçamento</h1></Hero>
      <section className="wrap form-wrap">
        <h2 className="ttl">Solicite seu orçamento com a BR Robotics</h2>
        <form onSubmit={enviar} noValidate>
          <Campo id="assunto" label="Sobre o que você deseja conversar *" cls="plain" placeholder="Coloque o assunto..." value={v.assunto} onChange={set} erro={erros.assunto} />
          <fieldset className="opts">
            <legend>Produtos ou serviços *</legend>
            {OPCOES.map((o) => (
              <label className="opt" key={o.id}>
                <input type="checkbox" checked={o.id in sel} onChange={() => toggle(o.id)} />{o.nome}
                {o.id in sel && <input type="number" min="1" max="999" value={sel[o.id]} aria-label={`Quantidade de ${o.nome}`} onChange={(e) => setSel({ ...sel, [o.id]: Math.max(1, +e.target.value || 1) })} />}
              </label>
            ))}
          </fieldset>
          {linhas.map((l, i) => (
            <div key={i} className={`row ${l.length === 3 ? 'r3' : 'r2'}`}>
              {l.map(([id, label, icon, ph, type = 'text']) => (
                <Campo key={id} id={id} label={label} icon={icon} type={type} placeholder={ph} value={v[id]} onChange={set} erro={erros[id]} />
              ))}
            </div>
          ))}
          <Campo id="obs" as="textarea" rows="3" label="Observações / especificações do pedido" placeholder="Conte mais detalhes, se quiser" value={v.obs} onChange={set} />
          <p id="msg" role="alert" className={msg ? (msg.ok ? 'ok' : 'bad') : ''}>
            {msg?.t} {msg?.protocolo && <Link to={`/acompanhar?protocolo=${msg.protocolo}`}>Acompanhar solicitação</Link>}
          </p>
          <button className="send" type="submit">Enviar</button>
        </form>
      </section>
    </>
  )
}
