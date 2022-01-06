import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './components/forms/LoginForm';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<LoginForm />} />
        <Route path="/" element="" />
      </Routes>
      <Footer />
    </Router>
  )
}
