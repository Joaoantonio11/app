import { Component, Suspense, lazy, useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/ui.jsx'
import { AuthProvider, useAuth } from './lib/auth.jsx'

// RNF007: páginas carregadas sob demanda
const Inicio = lazy(() => import('./pages/Inicio.jsx'))
const Servicos = lazy(() => import('./pages/Servicos.jsx'))
const EmAlta = lazy(() => import('./pages/EmAlta.jsx'))
const Sobre = lazy(() => import('./pages/Sobre.jsx'))
const Solucoes = lazy(() => import('./pages/Solucoes.jsx'))
const Orcamento = lazy(() => import('./pages/Orcamento.jsx'))
const Catalogo = lazy(() => import('./pages/Catalogo.jsx'))
const Produto = lazy(() => import('./pages/Produto.jsx'))
const Acompanhar = lazy(() => import('./pages/Acompanhar.jsx'))
const Historico = lazy(() => import('./pages/Historico.jsx'))
const Perfil = lazy(() => import('./pages/Perfil.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Cadastro = lazy(() => import('./pages/Cadastro.jsx'))

// RNF005: erros inesperados viram mensagem amigável, sem detalhes técnicos
class Erro extends Component {
  state = { e: false }
  static getDerivedStateFromError() { return { e: true } }
  render() {
    return this.state.e
      ? <section className="wrap"><p className="alert bad" role="alert">Algo deu errado por aqui. Atualize a página ou volte ao <a href="#/">início</a>. Se o problema continuar, tente novamente mais tarde.</p></section>
      : this.props.children
  }
}

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function Privada({ children }) {
  const { user } = useAuth()
  const loc = useLocation()
  return user ? children : <Navigate to="/login" replace state={{ from: loc.pathname }} />
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollTop />
        <Header />
        <main>
          <Erro>
            <Suspense fallback={<p className="wrap" role="status">Carregando…</p>}>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/produto/:id" element={<Produto />} />
                <Route path="/servicos" element={<Servicos />} />
                <Route path="/em-alta" element={<EmAlta />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/solucoes" element={<Solucoes />} />
                <Route path="/orcamento" element={<Orcamento />} />
                <Route path="/acompanhar" element={<Acompanhar />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/conta" element={<Privada><Perfil /></Privada>} />
                <Route path="/historico" element={<Privada><Historico /></Privada>} />
                <Route path="*" element={<Inicio />} />
              </Routes>
            </Suspense>
          </Erro>
        </main>
      </HashRouter>
    </AuthProvider>
  )
}
