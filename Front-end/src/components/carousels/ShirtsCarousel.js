import React,{useReducer, useEffect} from 'react';
import axios from 'axios';
import Slider from "react-slick";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Rating from '../Rating';
import {Link} from 'react-router-dom';

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true};
      case 'FETCH_SUCCESS':
        return { ...state, productList: action.payload, loading: false};
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload};
      default:
        return state
    }
  };
  
const ShirtsCarousel = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };


      const [{ loading, error, productList}, dispatch] = useReducer(reducer, {
        productList: [],
        loading: true,
        error: '',
      });
    
      useEffect(() => {
        dispatch({type: 'FETCH_REQUEST'});
        axios.get('http://localhost:5000/product')
        .then(function (response) {
          console.log(response);
          dispatch({type: 'FETCH_SUCCESS', payload: response.data});
        })
        .catch(function (error) {
          console.log(error);
          dispatch({type: 'FETCH_FAIL', payload: error.message});
        });
      },[])
    
      return (
          <div>
               <Row>
            <Col>
        <h3>Shirts</h3>
            </Col>
            <Col className='col text-end'>
                <div>
                    <Link to="/search/category/shirts">
                        <Button type='button'>
                        View All
                        </Button>
                    </Link>
                </div>
            </Col>
        </Row>

        <Slider {...settings} className="m-5">
            {
                loading ? <div>Loading...</div>
                : 
                error ? <div>{error}</div>
                : (
                productList && productList
                .filter((item) => item.product_category === ("Shirts" || "shirts"))
                .filter((item, index) => index < 6)
                .map((item, index) => {
                return (
                <div>
                <Card key={index}>
                    <img src={item.product_image} className="card-img-top" alt={item.product_name} height="250px" />
                    <Card.Body>
                    <Card.Title>
                        {item.product_name}
                    </Card.Title>
                    <Rating rating={item.product_rating} numReviews={item.product_reviews} />
                    <Card.Text>
                        Rs. {item.product_price}
                    </Card.Text>
                    <Button>Add to Cart</Button>
                    </Card.Body>
                </Card>
                </div>
                );
                }) )
            }
        </Slider>
        </div>
      );
}

export default ShirtsCarousel;