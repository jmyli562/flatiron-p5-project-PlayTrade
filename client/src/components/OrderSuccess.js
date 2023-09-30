import React from "react";
import "../components/css/OrderSuccess.css"; // Import your CSS file for styling

function OrderSuccess() {
  return (
    <div className="order-container">
      <div className="order-success">
        <h1>Order Successful!</h1>
        <p>
          You can view your purchased games by clicking on the "My Library" tab
          or by clicking on the link below.
        </p>
        <p>Thank you for shopping with us!</p>
        <a href="/library">View your games</a>
      </div>
    </div>
  );
}

export default OrderSuccess;
