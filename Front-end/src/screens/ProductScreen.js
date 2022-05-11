import React,{ useEffect, useReducer, useState} from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Rating from '../components/Rating';
import logger from 'use-reducer-logger';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true};
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false};
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload};
      case 'CREATE_REVIEW':
        return { ...state, loading: true};
      case 'CREATE_REVIEW_SUCCESS':
        return { ...state, review: action.payload, loading: false};
      case 'CREATE_REVIEW_FAIL':
        return { ...state, loading: false, error: action.payload};
      default:
      return state
  }
};

const ProductScreen = () => {

  const params = useParams();
  const {id} = params;

  const loginname = useSelector((state) => state.loginName);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [flag, setFlag] = useState("");

  const [{ loading, error, product}, dispatch] = useReducer( logger(reducer), {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    dispatch({type: 'FETCH_REQUEST'});
    axios.get(`http://localhost:5000/product/${id}`)
    .then(function (response) {
      console.log(response);
      dispatch({type: 'FETCH_SUCCESS', payload: response.data});
    })
    .catch(function (error) {
      console.log(error);
      dispatch({type: 'FETCH_FAIL', payload: error.message});
    });
  },[id,flag])

  const submitHandler = (e) => {
    e.preventDefault();
    if(comment && rating){
      const review = {rating, comment, name: loginname};
      dispatch({type: 'CREATE_REVIEW'});
      axios.post(`http://localhost:5000/product/${id}/reviews`,review)
      .then(function (response) {
        console.log(response);
        dispatch({type: 'CREATE_REVIEW_SUCCESS', payload: response.review});
        window.alert("Review Submitted Successfully");
        setFlag(!flag);
        setComment("");
        setRating(0);
      })
      .catch(function (error) {
        console.log(error);
        dispatch({type: 'CREATE_REVIEW_FAIL', payload: error.message});
      });      
    }else{
      alert('Please enter comment and rating!');
    }
  }

  return (
    <div className='mt-3'>
      {
        loading ? <div>Loading...</div>
        : 
        error ? <div>{error}</div>
        : (
        <div>
            <Row>
                <Col md={6}>
                    <img
                    className='img-large'
                    src={product.product_image}
                    alt={product.product_name}
                    />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h1>{product.product_name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                             rating={product.product_rating}
                             numReviews={product.product_reviews}
                            >
                            </Rating>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: Rs. {product.product_price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.product_description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>Rs. {product.product_price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                        {product.product_countInStock>0 
                                        ? 
                                        <Badge bg="success">In Stock</Badge>
                                        :
                                        <Badge bg="danger">Unavailable</Badge>
                                        }
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.product_countInStock > 0 && (
                                    <ListGroup.Item>
                                        <div className='d-grid'>
                                            <Button variant='primary'>
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div>
              <h2 id="reviews">
                Reviews
              </h2>
              {product.product_reviews === 0 && (<div class="alert alert-info" role="alert">
                There is no review!
              </div>)}
              <ul>
                {product.reviews.map((review,index) => {
                 return (
                  <li key={index}>
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} caption=" "></Rating>
                    <p>{review.comment}</p>
                  </li>
                )})}
                <li>
                  <form className='form' onSubmit={submitHandler}>
                    <div>
                      <h4>Write a review</h4>
                    </div>
                    <div>
                      <label htmlFor='rating'>Rating</label>
                    </div>
                    <div>
                      <ReactStars
                        count={5}
                        value={rating}
                        onChange={(e)=>setRating(e)}
                        size={24}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div>
                      <label htmlFor='comment'>Comment</label>
                    </div>
                    <div>
                      <textarea id='comment' value={comment} onChange={(e)=>setComment(e.target.value)}>
                      </textarea>
                    </div>
                    <div>
                      <label/>
                      <Button className='primary' type='submit'>Submit</Button>
                    </div>
                  </form>
                </li>
              </ul>
            </div>
        </div>
        )
      }
    </div>
  )
}

export default ProductScreen;