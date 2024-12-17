import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allOrders").then((res) => {
      // console.log(res.data);
      setAllOrders(res.data);
    });
  }, []);

 
  const labels = allOrders.map((order) => order.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allOrders.map((order) => order.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Mode</th>
            {/* <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th> */}
          </tr>

          {allOrders.map((order, index) => {
            const curValue = order.price * order.qty;
            // const isProfit = curValue - order.avg * order.qty >= 0.0;
            // const profClass = isProfit ? "profit" : "loss";
            // const dayClass = order.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price.toFixed(2)}</td>
                {/* <td>{curValue.toFixed(2)}</td> */}
                {/* <td className={profClass}>
                  {(curValue - order.avg * order.qty).toFixed(2)}
                </td>
                <td className={profClass}>{order.net}</td>
                <td className={dayClass}>{order.day}</td> */}
                <td>{order.mode}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Orders;
