import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'

export default class Main extends Component {
    render(){
        return (
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./jpg/pizza_1.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./jpg/pizza_2.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./jpg/pizza_3.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        );
    }
}
