import "./App.css";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./components/header/header";
import Home from "./pages/home/home";

// Pages
import Login from "./pages/login/login";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
