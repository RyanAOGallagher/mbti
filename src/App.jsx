import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import QuestionScreen from "./Screens/QuestionScreen";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<HomeScreen />} />
      <Route path="/questions" element={<QuestionScreen/>} />
    </Routes>
  </Router>
  );
}

export default App;