import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Main from './components/Main';
import MenuPizza from './components/MenuPizza';
import Cart from './components/Cart';
import Orders from './components/Orders';


export default class Index extends Component {
  render(){
    return (
      <div className="container">
        <Router>
          <div>
            <Route path='/' exact component={Main}/>
            <Route path='/pizza' exact component={MenuPizza}/>
            <Route path='/orders' exact component={Orders}/>
            <Route path='/cart' exact component={Cart}/>
          </div>
        </Router>
      </div>
    );
  }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}
