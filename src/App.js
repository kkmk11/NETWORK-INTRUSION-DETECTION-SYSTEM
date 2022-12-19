import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
}from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Details from './components/Details'
import Model from './components/Model'
import {useState} from 'react'
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }
  return (
    <>
    <NoteState>
    <Router>
    <Navbar />
    <Alert alert={alert}/>
    {/* <Home/> */}
    <div className="container">
    <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
      <Route exact path="/About" element={<About />}/>
      <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
      <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}/>
      <Route exact path="/myinfo" element={<Details />}/>
      <Route exact path="/model"  element={<Model />}/>
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
