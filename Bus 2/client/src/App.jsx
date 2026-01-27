import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import SignupForm from "./Pages/SignupForm";
import LoginForm from "./Pages/LoginForm";
import Driver from "./Pages/Driver";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<LoginForm/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<SignupForm/>}/>
        <Route path="/driverhome" element={<Driver/>}/>
       
      
     
       
        
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
