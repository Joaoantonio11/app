import { createContext, useContext, useEffect, useState } from 'react'
import { hash, users, saveUsers, getSession, setSession, clearSession } from './db.js'

const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)
const EMAIL = /^\S+@\S+\.\S+$/
const OBRIG = 'Por favor, preencha todos os campos obrigatórios.'
export const senhaOk = (s) => s.length >= 8 && /[A-Za-z]/.test(s) && /\d/.test(s)
const SENHA_REGRA = 'A senha deve ter ao menos 8 caracteres, com letras e números.'

const inicial = () => {
  const s = getSession()
  return s && !s.expired ? users().find((u) => u.id === s.id) ?? null : null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(inicial)
  const [aviso, setAviso] = useState(() => (getSession()?.expired ? 'A sua sessão expirou. Entre novamente.' : null))

  // RF010: sessão expira sozinha e o usuário volta para o login
  useEffect(() => {
    const t = setInterval(() => {
      const s = getSession()
      if (s?.expired) { setUser(null); setAviso('A sua sessão expirou. Entre novamente.'); location.hash = '#/login' }
    }, 15000)
    return () => clearInterval(t)
  }, [])

  async function cadastrar(d) {
    if (['nome', 'email', 'senha', 'confirma'].some((k) => !d[k]?.trim())) return { erro: OBRIG }
    if (!EMAIL.test(d.email)) return { erro: 'O e-mail informado é inválido.' }
    if (users().some((u) => u.email === d.email.trim().toLowerCase())) return { erro: 'Este e-mail já está cadastrado. Tente entrar na sua conta.' }
    if (!senhaOk(d.senha)) return { erro: SENHA_REGRA }
    if (d.senha !== d.confirma) return { erro: 'A senha e a confirmação são diferentes.' }
    const c = await hash(d.senha)
    saveUsers([...users(), { id: crypto.randomUUID(), nome: d.nome.trim(), email: d.email.trim().toLowerCase(), nascimento: d.nascimento || '', telefone: '', empresa: '', salt: c.salt, hash: c.hash }])
    return { ok: true }
  }

  async function entrar(email, senha) {
    if (!email.trim() || !senha) return { erro: 'Informe o e-mail e a senha para entrar.' }
    const u = users().find((x) => x.email === email.trim().toLowerCase())
    if (!u) return { erro: 'Este e-mail não está cadastrado. Crie uma conta para continuar.' }
    if ((await hash(senha, u.salt)).hash !== u.hash) return { erro: 'Senha incorreta. Verifique e tente novamente.' }
    setSession(u.id); setUser(u); setAviso(null)
    return { ok: true }
  }

  function sair() { clearSession(); setUser(null); setAviso('Você saiu da sua conta com segurança.') }

  async function atualizar(d) {
    if (!d.nome.trim() || !d.email.trim()) return { erro: OBRIG }
    if (!EMAIL.test(d.email)) return { erro: 'O e-mail informado tem formato inválido.' }
    if (d.telefone && !/^[\d\s()+-]{8,}$/.test(d.telefone)) return { erro: 'O telefone informado tem formato inválido.' }
    const email = d.email.trim().toLowerCase()
    if (users().some((u) => u.id !== user.id && u.email === email)) return { erro: 'Este e-mail já pertence a outra conta registada.' }
    if ((email !== user.email || d.nova) && (await hash(d.senhaAtual || '', user.salt)).hash !== user.hash) return { erro: 'A senha atual informada está incorreta.' }
    let cred = {}
    if (d.nova) {
      if (!senhaOk(d.nova)) return { erro: SENHA_REGRA }
      if (d.nova !== d.confirma) return { erro: 'A nova senha e a confirmação são diferentes.' }
      cred = await hash(d.nova)
    }
    const novo = { ...user, nome: d.nome.trim(), email, nascimento: d.nascimento, telefone: d.telefone, empresa: d.empresa, ...cred }
    saveUsers(users().map((u) => (u.id === user.id ? novo : u)))
    setUser(novo)
    return { ok: true }
  }

  return <Ctx.Provider value={{ user, aviso, setAviso, cadastrar, entrar, sair, atualizar }}>{children}</Ctx.Provider>
}
