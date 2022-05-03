import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';

const Product = () => {

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/product')
    .then(function (response) {
      setProductList(response.data);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])

  return (
    <div>
      <Row>
      {
        productList && productList.map((item, index) => {
          return (
          <Col sm={6} md={4} lg={3} className="mb-3">
          <Card key={index}>
            <img src={item.product_image} className="card-img-top" alt={item.product_name} />
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
        })
      }
      </Row>
    </div>
  )
}

export default Product;