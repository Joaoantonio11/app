import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Hero, Campo, Alerta } from '../components/ui.jsx'
import { useAuth } from '../lib/auth.jsx'

export default function Login() {
  const { entrar, aviso } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const [v, setV] = useState({ email: '', senha: '' })
  const [erro, setErro] = useState(null)
  const [busy, setBusy] = useState(false)
  const set = (e) => setV({ ...v, [e.target.name]: e.target.value })

  const enviar = async (e) => {
    e.preventDefault(); setBusy(true)
    const r = await entrar(v.email, v.senha)
    setBusy(false)
    if (r.erro) setErro(r.erro); else nav(loc.state?.from || '/', { replace: true })
  }

  return (
    <>
      <Hero cls="h-orc"><h1 className="one">Entrar</h1></Hero>
      <section className="wrap form-wrap">
        <form className="pg" onSubmit={enviar} noValidate>
          <Alerta tipo="info">{aviso}</Alerta>
          <Alerta tipo="bad">{erro}</Alerta>
          <Campo id="email" label="E-mail *" icon="mail" type="email" autoComplete="email" placeholder="Digite seu e-mail" value={v.email} onChange={set} erro={erro && !v.email.trim()} />
          <Campo id="senha" label="Senha *" icon="user" type="password" autoComplete="current-password" placeholder="Digite sua senha" value={v.senha} onChange={set} erro={erro && !v.senha} />
          <button className="send" type="submit" disabled={busy}>Entrar</button>
          <p>Ainda não tem conta? <Link to="/cadastro">Criar conta</Link></p>
        </form>
      </section>
    </>
  )
}
