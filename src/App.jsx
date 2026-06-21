import { useState, useEffect } from 'react'
import './App.css'
import Layout from './pages/Layout';
import useAuth from './context/AuthContext';
import { ThemeProvider } from './context/Theme';
import Dashboard from './components/Dashboard/Dashboard.jsx';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" replace />;
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/home" replace /> : children;
}

function App() {
  const [count, setCount] = useState(0)
  const { user } = useAuth();
  const [themeMode, setThemeMode] = useState("light")
  function darkTheme() {
    setThemeMode("dark")
  }
  function lightTheme() {
    setThemeMode("light")
  }
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark")
    document.querySelector("html").classList.add(themeMode)
  }, [themeMode])
  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <Layout>
        <Dashboard />
      </Layout>

    </ThemeProvider>
  )
}

export default App
