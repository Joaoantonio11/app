import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Hero, Campo, Alerta } from '../components/ui.jsx'
import { useAuth } from '../lib/auth.jsx'

export default function Cadastro() {
  const { cadastrar, setAviso } = useAuth()
  const nav = useNavigate()
  const [v, setV] = useState({ nome: '', email: '', nascimento: '', senha: '', confirma: '' })
  const [erro, setErro] = useState(null)
  const set = (e) => setV({ ...v, [e.target.name]: e.target.value })

  const enviar = async (e) => {
    e.preventDefault()
    const r = await cadastrar(v)
    if (r.erro) return setErro(r.erro)
    setAviso('Cadastro realizado com sucesso! Entre com o seu e-mail e senha.')
    nav('/login')
  }
  const vazio = (k) => erro && !v[k].trim()

  return (
    <>
      <Hero cls="h-orc"><h1 className="one">Criar conta</h1></Hero>
      <section className="wrap form-wrap">
        <form className="pg" onSubmit={enviar} noValidate>
          <Alerta tipo="bad">{erro}</Alerta>
          <Campo id="nome" label="Nome completo *" icon="user" autoComplete="name" placeholder="Digite seu nome completo" value={v.nome} onChange={set} erro={vazio('nome')} />
          <Campo id="email" label="E-mail *" icon="mail" type="email" autoComplete="email" placeholder="Digite seu e-mail" value={v.email} onChange={set} erro={vazio('email')} />
          <Campo id="nascimento" label="Data de nascimento" type="date" value={v.nascimento} onChange={set} />
          <Campo id="senha" label="Senha * (mínimo 8 caracteres, com letras e números)" icon="user" type="password" autoComplete="new-password" placeholder="Crie uma senha" value={v.senha} onChange={set} erro={vazio('senha')} />
          <Campo id="confirma" label="Confirmação de senha *" icon="user" type="password" autoComplete="new-password" placeholder="Repita a senha" value={v.confirma} onChange={set} erro={vazio('confirma')} />
          <button className="send" type="submit">Criar conta</button>
          <p>Já tem conta? <Link to="/login">Entrar</Link></p>
        </form>
      </section>
    </>
  )
}
