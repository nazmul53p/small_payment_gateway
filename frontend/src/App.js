import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './App.css';
import logo from './logo.svg';
function App() {
  const [product, setProduct] = useState({
    name: 'React from FB',
    price: 10,
    productBy: 'facebook'
  });

  const makePayment = token => {
    const body = {
      token,
      product
    };
    const headers = {
      "Content-Type": 'application/json'
    }
    return fetch('http://localhost:4000/payment', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    }).then(response => {
      const { status } = response;
      
    }).catch(err=>console.log(err))
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Payment Gateway
        </a><br/>
        <StripeCheckout stripeKey={process.env.REACT_APP_KEY} token={makePayment} name="Buy Product" amount={product.price * 100} >
          <button className="btn-large blue">Buy product is just 10$</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
