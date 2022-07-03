import './App.css';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes className='main'>  
          <Route path="/" exact element={<Login/>}></Route> 
          <Route path="/login" exact element={<Login/>}></Route> 
          <Route path="/register" exact element={<Register/>}></Route>
          <Route path="/landing" exact element={<Landing/>}></Route>
          <Route path="/cart" exact element={<Cart/>}></Route>
          <Route>404 not found</Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
