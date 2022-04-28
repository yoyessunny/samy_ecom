import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submit = (e) => {
      e.preventDefault();

      var axios = require('axios');
      var data = JSON.stringify({
        "email": email,
        "password": password
      });
      var config = {
        method: 'post',
        url: 'http://restapi.adequateshop.com/api/authaccount/login',
        headers: {
          'app-id': '0JyYiOQXQQr5H9OEn21312',
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const loginname = response.data.data.Name;
        dispatch({
          type:'add',
          item: loginname
        });
        if(response.data.message==="success"){
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  return (
    <div className="text-center">   
      <main className="form-signin">          
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
            <input type="email" className="form-control" placeholder="name@example.com"
              onChange={e => setEmail(e.target.value)}
            />
            </div>
            <div className="form-floating">
            <input type="password" className="form-control" placeholder="Password" 
              onChange={e => setPassword(e.target.value)}
            />
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p className='forgot-password text-right'>
            <Link to="/forgot">Forgot password?</Link>  
            </p>
        </form>
      </main>
    </div>
  )
}

export default Login