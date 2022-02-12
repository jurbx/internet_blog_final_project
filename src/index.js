import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Static from "./components/Static";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/about" element={<Static item="about" />} />
        <Route path="/sign-up" element={<Static item="sign-up" />} />
        <Route path="/sign-in" element={<Static item="sign-in" />} />
        <Route path="/users/:userName" element={<Static item="account" />} />
        <Route path="/users" element={<Static item="not-found" />} />
        <Route path="/post:postId" element={<Static item="single-post" />} />
        <Route path="/edit-post" element={<Static item="edit-post" />} />
        <Route path="/" element={<Static item="home" />} />
        <Route path="*" element={<Static item="notfound" />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
