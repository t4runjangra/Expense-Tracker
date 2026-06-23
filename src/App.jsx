import { useState, useEffect } from 'react';
import './App.css';
import Layout from './pages/Layout';
import { ThemeProvider } from './context/Theme';
import Dashboard from './components/Dashboard/Dashboard.jsx';

function App() {
  const [themeMode, setThemeMode] = useState('dark');

  function darkTheme() {
    setThemeMode('dark');
  }

  function lightTheme() {
    setThemeMode('light');
  }

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <Layout>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
