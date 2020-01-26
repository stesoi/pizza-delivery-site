import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


export default class Orders extends Component {
  constructor(){
      super();
      this.state = {
          orders: []
      }
      this.getOrders = this.getOrders.bind(this);
  }


  getOrders(){
    var phone = document.getElementById("phone").value.replace(/[^0-9]/g, '');
    fetch(`/api/orders/${phone}`,{
       headers : {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
        }
     })
        .then(response => {
            return response.json();
        })
        .then(orders => {
            this.setState({orders: orders});
        });
  }

  renderOrdersList(){
    if(this.state.orders.length == 0){
      return(
        <h1>Orders not found</h1>
      );
    }
    else{
      return this.state.orders.map(order => {
        return (
          <Card>
            <Card.Body>
              <Card.Title>Date: {order.date}</Card.Title>
              <Card.Text>
                {order.pizza} x {order.number}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })
    }
  }

  render(){
    return(
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <h1>Here you can see a list of your orders</h1>
            <br/>
            <div className="col-5">
              <PhoneInput
                country='ru'
                inputProps={{
                  id: 'phone',
                  required: true,
                }} />
            </div>
          </Form.Group>
          <div className="col-5">
            <Button variant="primary" onClick={this.getOrders}>
              Check
            </Button>
          </div>
        </Form>
        <br/>
        <div>
          {this.renderOrdersList()}
        </div>
      </div>
    );
  }
}
