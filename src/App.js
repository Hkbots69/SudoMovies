import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./MovieContext";
import Panel from "./components/Panel";
import Container from "./components/Container";
import Details from "./components/Details";
import Login from "./components/Login"
import Singup from "./components/Singup"
import Profile from "./components/Profile";
import Adminlogin from "./admin/Login";
import Dashboard from "./admin/Dashboard";

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/singup" element={<Singup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Adminlogin />} />
          <Route path="/profile" element={<><Profile /></>} />
          <Route path="/home" element={ <> <Panel /> <Container /> </> } />
          <Route path="/movie"> <Route path=":movieId" element={<Details />} /> </Route>
        </Routes>
      </MovieProvider>
    </div>
  );
}

export default App;
