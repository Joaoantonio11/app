import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'

const paths = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  wa: <path d="M3 21l1.6-4.6A9 9 0 1112 21a9 9 0 01-4.4-1.2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></>,
  userOk: <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0114 0M16 11l2 2 4-4" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></>,
  screen: <><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M8 21h8M12 16v5" /></>,
  doc: <path d="M6 3h8l4 4v14H6zM14 3v4h4" />,
  pin: <><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
}

export const Icon = ({ n }) => (
  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[n]}</svg>
)

export const img = (n) => `/images/${n}.jpg`

const NAV = [['/catalogo', 'Catálogo'], ['/servicos', 'Serviços e peças'], ['/em-alta', 'Em alta'], ['/sobre', 'Sobre nós'], ['/solucoes', 'Soluções']]

export function Header() {
  const { user, sair } = useAuth()
  const nav = useNavigate()
  return (
    <header className="top">
      <Link className="logo" to="/">BRR</Link>
      <span><Icon n="phone" /> +55 (41) 0103-2010</span>
      <a href="https://wa.me/554101032010" target="_blank" rel="noreferrer"><Icon n="wa" /> Conversar agora</a>
      <a href="mailto:info@brRobotics.com.br"><Icon n="mail" /> info@brRobotics.com.br</a>
      <Link className="btn-y" to="/orcamento">Orçamentos</Link>
      <Link className="lnk" to="/acompanhar">Acompanhar pedido</Link>
      {user ? (
        <>
          <Link className="lnk" to="/conta">Olá, {user.nome.split(' ')[0]}</Link>
          <Link className="lnk" to="/historico">Histórico</Link>
          <button className="lnk" onClick={() => { sair(); nav('/login') }}>Sair</button>
        </>
      ) : <Link className="lnk" to="/login">Entrar</Link>}
    </header>
  )
}

export function Campo({ id, label, icon, erro, cls = '', as: T = 'input', children, ...p }) {
  const campo = <T id={id} name={id} className={`${cls} ${erro ? 'err' : ''}`} aria-invalid={!!erro} {...p}>{children}</T>
  return <div className="f"><label htmlFor={id}>{label}</label>{icon ? <div className="inp"><Icon n={icon} />{campo}</div> : campo}</div>
}

export const Alerta = ({ tipo, children }) => (children ? <p className={`alert ${tipo}`} role={tipo === 'bad' ? 'alert' : 'status'}>{children}</p> : null)

export function Hero({ cls, brand = false, children }) {
  return (
    <section className={`hero ${cls}`}>
      <div className="hero-nav">
        {brand && <strong className="brand">BR Robotics</strong>}
        <nav>{NAV.map(([to, t]) => <NavLink key={to} to={to}>{t}</NavLink>)}</nav>
      </div>
      <div className="hero-t">{children}</div>
    </section>
  )
}

export function Band({ cls, pic, alt, children }) {
  return (
    <article className={`band ${cls}`}>
      <div className="band-t">{children}</div>
      <img src={img(pic)} alt={alt} />
    </article>
  )
}
