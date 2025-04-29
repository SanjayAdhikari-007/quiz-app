import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Header from './components/header';
import UserForm from './components/UserForm';
import QuizPage from './components/QuizPage';
import Results from './components/Results';

function App() {
  return (
    <UserProvider>
      <BrowserRouter basename="/quiz-app">
        <Header />
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
