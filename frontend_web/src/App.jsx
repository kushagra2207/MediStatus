import AppRouterProvider from "./router/AppRouter"
import { AuthProvider } from "./hooks/useAuth"

function App() {
  return (
    <AuthProvider>
      <AppRouterProvider />
    </AuthProvider>
  )
}

export default App
