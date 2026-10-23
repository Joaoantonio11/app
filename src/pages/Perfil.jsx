import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Hero, Campo, Alerta } from '../components/ui.jsx'
import { useAuth } from '../lib/auth.jsx'

export default function Perfil() {
  const { user, atualizar } = useAuth()
  const [v, setV] = useState({ nome: user.nome, email: user.email, nascimento: user.nascimento || '', telefone: user.telefone || '', empresa: user.empresa || '', senhaAtual: '', nova: '', confirma: '' })
  const [msg, setMsg] = useState(null)
  const set = (e) => setV({ ...v, [e.target.name]: e.target.value })

  const enviar = async (e) => {
    e.preventDefault()
    const r = await atualizar(v)
    if (r.erro) return setMsg({ tipo: 'bad', t: r.erro })
    setV({ ...v, senhaAtual: '', nova: '', confirma: '' })
    setMsg({ tipo: 'ok', t: 'Dados atualizados com sucesso.' })
  }
  const vazio = (k) => msg?.tipo === 'bad' && !v[k].trim()

  return (
    <>
      <Hero cls="h-orc"><h1 className="one">Meu perfil</h1></Hero>
      <section className="wrap form-wrap">
        <form className="pg" onSubmit={enviar} noValidate>
          <Alerta tipo={msg?.tipo}>{msg?.t}</Alerta>
          <Campo id="nome" label="Nome completo *" icon="user" value={v.nome} onChange={set} erro={vazio('nome')} />
          <Campo id="email" label="E-mail *" icon="mail" type="email" value={v.email} onChange={set} erro={vazio('email')} />
          <Campo id="nascimento" label="Data de nascimento" type="date" value={v.nascimento} onChange={set} />
          <Campo id="telefone" label="Telefone" icon="wa" type="tel" placeholder="(00) 0000-0000" value={v.telefone} onChange={set} />
          <Campo id="empresa" label="Empresa" icon="screen" value={v.empresa} onChange={set} />
          <Campo id="senhaAtual" label="Senha atual (necessária para trocar e-mail ou senha)" icon="user" type="password" autoComplete="current-password" value={v.senhaAtual} onChange={set} />
          <Campo id="nova" label="Nova senha (opcional)" icon="user" type="password" autoComplete="new-password" value={v.nova} onChange={set} />
          <Campo id="confirma" label="Confirmar nova senha" icon="user" type="password" autoComplete="new-password" value={v.confirma} onChange={set} />
          <button className="send" type="submit">Salvar alterações</button>
          <Link to="/historico">Ver minhas solicitações</Link>
        </form>
      </section>
    </>
  )
}
