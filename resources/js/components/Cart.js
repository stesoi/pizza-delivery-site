import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


export default class Cart extends Component {
  constructor(props){
      super(props);
      this.state = {
          pizzas_in_ls:
            localStorage.getItem('pizzas_in_cart') == undefined ? {} :
              JSON.parse(localStorage.getItem('pizzas_in_cart')),
          pizzas_in_cart: [],
          total_summ_dollar: 0,
          total_summ_euro: 0,
          address: "",
          phone: ""
      }
      this.renderCartList = this.renderCartList.bind(this);
      this.sendOrder = this.sendOrder.bind(this);
      this.deletePizza = this.deletePizza.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    var tmp_pizzas_in_cart = [];
    for (var key in this.state.pizzas_in_ls) {
      fetch(`/api/pizza/${key}`)
          .then(response => {
              return response.json();
          })
          .then(pizza => {
              var tmp = this.state.pizzas_in_cart;
              tmp.push({pizza}.pizza);
              var tmp_number = Number(this.state.pizzas_in_ls[{pizza}.pizza.id]);
              var tmp_summ_dollar = this.state.total_summ_dollar + Number({pizza}.pizza.price_dollar)*tmp_number;
              var tmp_summ_euro = this.state.total_summ_euro + Number({pizza}.pizza.price_euro)*tmp_number;
              this.setState({pizzas_in_cart: tmp,
                total_summ_dollar: tmp_summ_dollar,
                total_summ_euro: tmp_summ_euro
              });
          });
    }
  }

  handleChange(event) {
    var pizza = this.state.pizzas_in_cart.filter(function(pizza) {
      return pizza.id == event.target.id;
    });
    var new_total_summ_dollar = this.state.total_summ_dollar + (Number(event.target.value) -
      Number(this.state.pizzas_in_ls[event.target.id]))*pizza[0].price_dollar;
    var new_total_summ_euro = this.state.total_summ_euro + (Number(event.target.value) -
      Number(this.state.pizzas_in_ls[event.target.id]))*pizza[0].price_euro;
    var pizzas_in_cart = JSON.parse(localStorage.getItem('pizzas_in_cart'));
    pizzas_in_cart[event.target.id] = event.target.value;
    localStorage.setItem('pizzas_in_cart', JSON.stringify(pizzas_in_cart));
    this.setState({pizzas_in_ls: JSON.parse(localStorage.getItem('pizzas_in_cart')),
      total_summ_dollar: new_total_summ_dollar,
      total_summ_euro: new_total_summ_euro});
  }

  renderCartList(){
    return this.state.pizzas_in_cart.map(pizza => (
      <Card>
        <Card.Body>
          <button type="button" className="close" onClick={this.deletePizza.bind(this, pizza.id)} >&times;</button >
          <Card.Title>{pizza.name}</Card.Title>
          <Card.Text>
            {pizza.price_dollar}$ / {pizza.price_dollar}€ x
            <input type="number" className="form-control col-1" id={pizza.id} min="1" style={{display: "inline"}} value={Number(this.state.pizzas_in_ls[pizza.id])} onChange={this.handleChange}/>
          </Card.Text>
        </Card.Body>
      </Card>
      )
    )}

  deletePizza(id){
    var new_pizza_in_ls = Object.assign({}, this.state.pizza_in_ls);
    var pizzas_in_ls = JSON.parse(localStorage.getItem('pizzas_in_cart'));
    delete pizzas_in_ls[id];
    localStorage.setItem('pizzas_in_cart', JSON.stringify(pizzas_in_ls));
    this.setState({
      pizzas_in_cart: this.state.pizzas_in_cart.filter(function(pizza) {
        return pizza.id != id;
      }),
      pizza_in_ls:  new_pizza_in_ls
    });
  }

  sendOrder(){
    if(document.getElementById('address').value.length < 10 || document.getElementById('phone').value.length < 10){
      alert("To complete the order, enter the address and phone number!");
    }
    else{
      var tmp = this.state.pizzas_in_cart.slice();
      var phone = document.getElementById("phone").value.replace(/[^0-9]/g, '');
      var address = document.getElementById("address").value;
      var date = new Date();
      var pizzas_in_ls = Object.assign({}, this.state.pizzas_in_ls);
      var orderData = tmp.map(function(pizza) {
        return {
          phone: phone,
          pizza: pizza.name,
          number: parseInt(pizzas_in_ls[pizza.id]),
          address: address,
          price_dollar: Number(pizza.price_dollar),
          price_euro: Number(pizza.price_euro),
          date: date
        };
      });
      fetch('api/orders/', {
        method:'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
       body: JSON.stringify(orderData)
     })
     .then(response => {
       return response.json();
     })
     .then(data => {
       alert("Order is accepted!");
       localStorage.setItem('pizzas_in_cart', JSON.stringify({}));
       this.setState({pizzas_in_cart: [], pizzas_in_ls: JSON.parse(localStorage.getItem('pizzas_in_cart'))});
     })
    }
  }

  render(){
    if (Object.keys(this.state.pizzas_in_ls).length == 0){
      return (
        <h1>Add something in cart!</h1>
      );
    }
    return (
      <div>
      <Form>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={2}>
              Address
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" id="address" placeholder="Enter address" />
              </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={2}>
              Phone number
              </Form.Label>
              <Col sm={10}>
              <PhoneInput id="phone"
                country='ru'
                inputProps={{
                  id: 'phone',
                  required: true
                }} />
              </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={2}>
              Total sum
              </Form.Label>
              <Col sm={10}>
                {this.state.total_summ_dollar.toFixed(2)}$ / {this.state.total_summ_euro.toFixed(2)}€
              </Col>
          </Form.Group>
          <Button variant="success" onClick={this.sendOrder.bind(this)}>
            Order
          </Button>
      </Form>
      <br/>
      {this.renderCartList()}
      </div>
    );
  }
}
