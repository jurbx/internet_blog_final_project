import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Static from './components/Static';

export default function App() {
  return (
    <Router>
      <Routes>

        <Route path="/about" element={<Static item="about" />} />
        <Route path="/sign-up" element={<Static item="sign-up" />} />
        <Route path="/sign-in" element={<Static item="sign-in" />} />
        <Route path="/sign-out" element={<Static item="sign-out" />} />
        <Route path="/user:userId" element={<Static item="account" />} />
        <Route path="/" element={<Static item="home" />} />
        <Route path="*" element={<Static item="notfound" />} />

      </Routes>
    </Router>
  )
}
