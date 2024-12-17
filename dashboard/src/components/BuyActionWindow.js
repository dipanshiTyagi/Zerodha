import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { closeBuyWindow } = useContext(GeneralContext);

  // const handleBuyClick = () => {
  //   axios.post("http://localhost:3002/newOrder", {
  //     name: uid,
  //     qty: stockQuantity,
  //     price: stockPrice,
  //     mode: "BUY",
  //   });

  //   closeBuyWindow();
  // };

  const handleBuyClick = async () => {
    const qty = parseInt(stockQuantity, 10);
    const price = parseFloat(stockPrice);

    if (qty <= 0 || price <= 0) {
      alert("Quantity and price must be greater than 0");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty,
        price,
        mode: "BUY",
      });
      console.log("Order placed:", response.data);
      
      closeBuyWindow();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  // Function to handle the sell click
  const handleSellClick = async () => {
    const qty = parseInt(stockQuantity, 10);
    const price = parseFloat(stockPrice);

    if (qty <= 0 || price <= 0) {
      alert("Quantity and price must be greater than 0");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty,
        price,
        mode: "SELL",
      });
      console.log("Sell order placed:", response.data);
      
      closeBuyWindow();
    } catch (error) {
      console.error("Error placing sell order:", error);
      alert("Failed to place sell order. Please try again.");
    }
  };


  const handleCancelClick = () => {
    closeBuyWindow();
  };
  
  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
            />
            
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(Number(e.target.value))}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        {/* <span>Margin required ₹140.65</span> */}
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link className="btn btn-red" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
