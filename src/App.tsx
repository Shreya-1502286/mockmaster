import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { InterviewSessionPage } from './pages/InterviewSessionPage';
import { LandingPage } from './pages/LandingPage';
import { ProgressPage } from './pages/ProgressPage';
import { ScorecardPage } from './pages/ScorecardPage';
import { SessionLobbyPage } from './pages/SessionLobbyPage';
import { SettingsPage } from './pages/SettingsPage';
import { TrackSelectPage } from './pages/TrackSelectPage';

export function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<Navigate to="/auth" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tracks" element={<TrackSelectPage />} />
            <Route path="/lobby/:trackId" element={<SessionLobbyPage />} />
            <Route path="/session/:sessionId" element={<InterviewSessionPage />} />
            <Route path="/scorecard/:sessionId" element={<ScorecardPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
