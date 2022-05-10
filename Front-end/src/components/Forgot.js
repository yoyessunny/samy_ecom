import React,{useState} from 'react';

const Forgot = () => {

  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div>
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Forgot Password</h1>

            <div className="form-floating">
            <input type="email" className="form-control" placeholder="name@example.com"
              onChange={e => setEmail(e.target.value)}
            />
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Forgot