import React,{useState} from 'react';
import axios from 'axios';

const AddProduct = () => {

  const [product_name, setProductName] = useState("");
  const [product_image, setProductImage] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_rating, setProductRating] = useState("");
  const [product_reviews, setProductReviews] = useState("");

  const submit = (e) => {
    e.preventDefault();

    var data = {
      "product_name": product_name,
      "product_image": product_image,
      "product_price": product_price,
      "product_rating": product_rating,
      "product_reviews": product_reviews,
    };
    axios.post('http://localhost:5000/productregister',data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
   
  return (
    <div className="text-center">   
    <main className="form-signin">          
      <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please add product</h1>

          <div className="form-floating">
            Product Name
          <input type="text" className="form-control" placeholder="Product Name"
            onChange={e => setProductName(e.target.value)}
          />
          </div>
          <div className="form-floating">
            Product Image
          <input type="text" className="form-control" placeholder="Product Image"
            onChange={e => setProductImage(e.target.value)}
          />
          </div>
          <div className="form-floating">
            Product Price
          <input type="text" className="form-control" placeholder="Product Price"
            onChange={e => setProductPrice(e.target.value)}
          />
          </div>
          <div className="form-floating">
            Product Rating
          <input type="text" className="form-control" placeholder="Product Rating"
            onChange={e => setProductRating(e.target.value)}
          />
          </div>
          <div className="form-floating">
            Product Reviews
          <input type="text" className="form-control" placeholder="Product Reviews"
            onChange={e => setProductReviews(e.target.value)}
          />
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Add Product</button>
      </form>
    </main>
    </div>
  );
}

export default AddProduct;