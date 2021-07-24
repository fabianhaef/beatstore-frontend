import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Beats from './pages/Beats';
import Soundkits from './pages/Soundkits';
import Licences from './pages/Licences';
import About from './pages/About';
import Beat from './pages/Beat';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';

import { FooterContainer } from './containers/footer'
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/beats" exact component={Beats} />
          <Route path="/soundkits" exact component={Soundkits} />
          <Route path="/licences" exact component={Licences} />
          <Route path="/about" exact component={About} />
          <Route path="/beats/:id" exact component={Beat} />
          <Route path="/cart/:id?" exact component={Cart} />
          
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/payment" component={Payment} />
        </Switch>
      </Router>
      
      <FooterContainer />
    </div>
  );
}

export default App;
