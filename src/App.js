import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/" element="" />
      </Routes>
      <Footer />
    </Router>
  )
}
