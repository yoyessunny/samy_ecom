import React,{ useEffect, useReducer} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import logger from 'use-reducer-logger';

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

const CategoryScreen = () => {

  
  const params = useParams();
  const {categoryName} = params;

  const [{ loading, error, productList}, dispatch] = useReducer( logger(reducer), {
    productList: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    dispatch({type: 'FETCH_REQUEST'});
    axios.get('http://localhost:5000/product')
    .then(function (response) {
      //setProductList(response.data);
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
      {
        loading ? <div>Loading...</div>
        : 
        error ? <div>{error}</div>
        : (
        productList && productList
        .filter((val) => {
          if (categoryName === '') {
            return val;
          } else if (val.product_category.toLowerCase().includes(categoryName.toLowerCase())) {
            return val;
          }
        })
        .map((item, index) => {
          return (
          <Col sm={6} md={4} lg={3} className="mb-3">
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
          </Col>
          );
        }) )
      }
      </Row>
    </div>
  )
}

export default CategoryScreen;