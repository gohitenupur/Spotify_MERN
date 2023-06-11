import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import "./output.css";
import LoginComponent from "./routes/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<><h2 className="bg-blue-500">hii</h2></>} />
        <Route path="/login" element={<LoginComponent/>}/>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
