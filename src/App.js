import { BrowserRouter,Switch,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import firebaseInitialize from './Firebase/Firebase.init';
import Header from './components/Header/Header';
firebaseInitialize()

function App() {
  return (
    <div className="container my-5">

     <BrowserRouter>
     <Header></Header>
     <Switch>
       <Route exact path="/">
         <Home></Home>
       </Route>
       <Route path="/home">
         <Home></Home>
       </Route>
       <Route path="/login">
         <Login></Login>
       </Route>
       <Route path="/register">
         <Register></Register>
       </Route>
     </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
