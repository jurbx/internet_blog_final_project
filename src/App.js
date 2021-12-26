import './index.css';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/scss/bootstrap.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Static from "./components/Static";
import NotFound from './components/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={
          <Static title="Login form" />
        } />
        <Route path="/recent-posts" element={
          <Static title="Recent Posts" />
        } />
        <Route path="/" element={
          <Static title="Home">
            <em>Some text</em>
          </Static>} />
        <Route path="*" element={
          <Static title="Not found">
            <NotFound />
          </Static>
        } />
      </Routes>
    </Router>
  );
}
