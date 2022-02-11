import "./App.css";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./components/header/header";
import Home from "./pages/home/home";
import Restaurants from "./pages/restaurants/restaurants";

// Pages
import Login from "./pages/login/login";
import Register from "./pages/register/register";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants/:id" element={<Restaurants />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
