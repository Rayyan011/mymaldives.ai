import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import AuthLayout from './components/AuthLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in/*" element={<AuthLayout mode="sign-in" />} />
      <Route path="/sign-up/*" element={<AuthLayout mode="sign-up" />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
