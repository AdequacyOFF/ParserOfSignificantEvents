import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "../pages/home/ui/index.jsx";


function App() {
  return (
    <div className="wrapper">
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
