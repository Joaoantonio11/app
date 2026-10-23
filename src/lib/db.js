// "Banco de dados" local (localStorage). Em produção, troque por uma API com HTTPS.
const J = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const S = (k, v) => localStorage.setItem(k, JSON.stringify(v))
const hex = (b) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('')

// RNF004: senha com hash PBKDF2 + salt; nunca é guardada em texto limpo
export async function hash(senha, salt = hex(crypto.getRandomValues(new Uint8Array(16)))) {
  const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(senha), 'PBKDF2', false, ['deriveBits'])
  const b = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 100000, hash: 'SHA-256' }, k, 256)
  return { salt, hash: hex(b) }
}

export const users = () => J('br_users', [])
export const saveUsers = (u) => S('br_users', u)
export const sols = () => J('br_sol', [])
export const saveSols = (s) => S('br_sol', s)

const SESSAO = 30 * 60 * 1000
export const setSession = (id) => S('br_session', { id, exp: Date.now() + SESSAO })
export const clearSession = () => localStorage.removeItem('br_session')
export function getSession() {
  const s = J('br_session', null)
  if (s && s.exp < Date.now()) { clearSession(); return { expired: true } }
  return s
}

export const fmt = (t) => new Date(t).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

// Simula o andamento do pedido pela equipe (1 min: em análise, 3 min: respondida)
export function acompanhar(s) {
  const dt = Date.now() - s.criadoEm
  const historico = [{ t: s.criadoEm, estado: 'Recebida', msg: 'Solicitação recebida pela equipe BR Robotics.' }]
  if (dt > 60000) historico.push({ t: s.criadoEm + 60000, estado: 'Em análise', msg: 'Nossa equipe está analisando o seu pedido.' })
  if (dt > 180000) historico.push({ t: s.criadoEm + 180000, estado: 'Respondida', msg: 'Enviamos a proposta comercial para o e-mail informado.' })
  const ultimo = historico[historico.length - 1]
  return { ...s, historico, estado: ultimo.estado, resposta: ultimo.estado === 'Respondida' ? ultimo.msg : null }
}
