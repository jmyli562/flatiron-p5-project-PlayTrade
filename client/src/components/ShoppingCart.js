import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import "../components/css/ShoppingCart.css";
function ShoppingCart() {
  function handleRemove(game) {
    //filter the shoppingCart array and remove the game
    //update the shoppingCart state using setShoppingCart

    const filteredCart = shoppingCart.filter((item) => {
      return item.id !== game.id;
    });
    setShoppingCart(filteredCart);
    window.alert("Item removed from cart.");
  }
  const { currUser, shoppingCart, setShoppingCart } = useContext(AppContext);
  return (
    <div>
      <div className="shopping-cart">
        <h1>Cart</h1>
        <hr></hr>
        {shoppingCart.map((item) => (
          <div className="cart-item" key={item.id}>
            <article className="checkout-item-game">
              <div className="item-image">
                <img src={item.image_url} alt={item.name} />
              </div>
              <div className="item-container">
                <div className="details-container">
                  <h3 className="name-container">
                    <p>{item.name}</p>
                  </h3>
                </div>
                <div className="price-delete-container">
                  <p>Cost: {item.price} points | </p>
                  <button
                    className="remove-game"
                    onClick={() => handleRemove(item)}
                  >
                    Remove game
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
        <hr></hr>
        <div className="cart-total">
          <p>Total:</p>
        </div>
        <button className="purchase-button">Purchase</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
