import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./store/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginForm from "./pages/LoginForm";
import MainPage from "./pages/MainPage";
import Search from "./pages/Search";
import Results from "./pages/Results";
import "./styles/global.scss";

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="main-wrap">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/search" /> : <LoginForm />} />
          <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/login" />} />
          <Route path="/results" element={isAuthenticated ? <Results /> : <Navigate to="/login" />} /> 
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
