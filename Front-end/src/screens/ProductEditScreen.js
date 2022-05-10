import React, { useEffect, useReducer, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true};
      case 'FETCH_SUCCESS':
        return { ...state, loading: false};
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload};
      case 'UPDATE_REQUEST':
        return { ...state, loadingUpdate: true};
      case 'UPDATE_SUCCESS':
        return { ...state, loadingUpdate: false};
      case 'UPDATE_FAIL':
        return { ...state, loadingUpdate: false};
      default:
        return state
    }
  };
  

const ProductEditScreen = () => {

    const params = useParams();
    const {id: product_id} = params;
    const navigate = useNavigate();

    const [{ loading, error }, dispatch] = useReducer( reducer, {
        loading: true,
        error: '',
      });    

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            try{
                dispatch({type: 'FETCH_REQUEST'});
                const {data} = await axios.get(`http://localhost:5000/product/${product_id}`);
                setName(data.product_name);
                setPrice(data.product_price);
                setImage(data.product_image);
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            }catch(err){
                dispatch({type: 'FETCH_FAIL', payload: err});
            }
        }
        fetchData();
    },[product_id]);

    const submitHandler = async(e) => {
        e.preventDefault();

        try{
            dispatch({type: 'UPDATE_REQUEST'});
            await axios.put(`http://localhost:5000/productedit/${product_id}`,{
                _id: product_id,
                name,
                price,
                image,
            });
            dispatch({type: 'UPDATE_SUCCESS'});
            toast.success('Product Updated');
            navigate('/productlist');
        } catch(err){
            toast.error(err);
            dispatch({type: 'UPDATE_FAIL'});
        }
    }

    return (
    <Container className='small-container'>
        <h1>Edit Product {product_id}</h1>
        {
             loading ? <div>Loading...</div>
             : 
             error ? <div>{error}</div>
             : (
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-3' controlId='name'>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='price'>
                        <Form.Label>
                            Price
                        </Form.Label>
                        <Form.Control
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='image'>
                        <Form.Label>
                            Image
                        </Form.Label>
                        <Form.Control
                        value={image}
                        onChange={(e)=>setImage(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <div className='mb-3'>
                        <Button type='submit'>
                            Update
                        </Button>
                    </div>
                </Form> 
            )
        }
    </Container>
  )
}

export default ProductEditScreen;