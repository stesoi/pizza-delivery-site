import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';;
import Modal from 'react-bootstrap/Modal';


export default class MenuPizza extends Component {
    constructor(props){
        super(props);
        this.state = {
            pizzas: []
        }
    }

    componentDidMount() {
        fetch('/api/pizza')
            .then(response => {
                return response.json();
            })
            .then(pizzas => {
                this.setState({pizzas: pizzas});
        });
    }

    addToCart(id) {
      var pizzas_in_cart = localStorage.getItem('pizzas_in_cart');
      if(pizzas_in_cart == null){
        pizzas_in_cart = {};
        pizzas_in_cart[id] = 1;
        console.log(pizzas_in_cart);
      }
      else{
        pizzas_in_cart = JSON.parse(pizzas_in_cart);
        console.log(pizzas_in_cart);
        if (pizzas_in_cart[id] === undefined){
          pizzas_in_cart[id] = 1;
        }
        else{
          pizzas_in_cart[id] = pizzas_in_cart[id] + 1;
        }
      }
      localStorage.setItem('pizzas_in_cart', JSON.stringify(pizzas_in_cart));
      alert("Pizza added to cart!");
    }

    renderPizzasList() {
      console.log(this.state.pizzas);
      return this.state.pizzas.map(pizza => {
        var path_to_img = `./jpg/${pizza.id}.jpg`;
        return (
          <Card style={{ width: '16rem'}} key={pizza.id}>
            <Card.Img variant="top" src={path_to_img} />
            <Card.Body>
              <Card.Title> {pizza.name}</Card.Title>
              <Card.Text>
                {pizza.description}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Card.Text>
                {pizza.price_dollar}$ / {pizza.price_dollar}€
              </Card.Text>
              <Button variant="success" onClick={this.addToCart.bind(this, pizza.id)}>
                Add to cart
              </Button>
            </Card.Footer>
          </Card>
        );
      })
    }

    render(){
      return (
        <div>
          <div className="card-columns">
            { this.renderPizzasList() }
          </div>
        </div>
      );
    }
}
