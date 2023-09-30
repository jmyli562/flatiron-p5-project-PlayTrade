import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import "../components/css/ShoppingCart.css";
import { useHistory } from "react-router-dom";
function ShoppingCart() {
  const history = useHistory();
  function updateUserPoints() {
    let num_points = currUser.points - calculateTotal();
    currUser.points = num_points;
    setCurrUser({ ...currUser });
    //we need to update the users points on the backend
    fetch(`/users/${currUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        points: currUser.points,
      }),
    });
  }
  function handleGamePurchase() {
    //this function will handle updating the game_library table with the game that the user purchased
    //NOTES:
    // to add the game to the game_library table we need the user_id (currUser) and the game_id (shoppingCart)
    //we need to also update the point balance. on the game card page do not let the user add a game they already have in their library to their cart
    //empty the cart after the games are finished being added by updating shoppingCart state
    //update the state of the currUser by updating their library array

    //loop through the shoppingCart array and for each item send a fetch request to the game_library endpoint.

    fetch("/library", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currUser.id,
        games: shoppingCart,
      }),
    })
      .then((resp) => resp.json())
      //retrieving the user with the updated library
      .then((user) => {
        setCurrUser({ ...currUser, library: user.library });
        //update the currUser's points on the backend
        //update the currUser's point by updating state
        updateUserPoints();
        setShoppingCart([]);
        history.push("/order/success");
      });
  }
  function calculateTotal() {
    //calculating the total price using reduce
    return shoppingCart.reduce((total, item) => total + item.price, 0);
  }
  function handleRemove(game) {
    //filter the shoppingCart array and remove the game
    //update the shoppingCart state using setShoppingCart

    const filteredCart = shoppingCart.filter((item) => {
      return item.id !== game.id;
    });
    setShoppingCart(filteredCart);
    window.alert("Item removed from cart.");
  }
  const { currUser, setCurrUser, shoppingCart, setShoppingCart } =
    useContext(AppContext);
  return (
    <div>
      <div className="shopping-cart">
        <h3 className="cart-header">Cart</h3>
        <hr></hr>
        {shoppingCart.length === 0 ? (
          <>
            <h1 className="cart-message">Your cart is empty.</h1>
          </>
        ) : (
          shoppingCart.map((item) => (
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
          ))
        )}
        <hr></hr>
        <div className="cart-total">
          <p>Total cost:{calculateTotal()} points</p>
        </div>
        {/*disabling the button if no items in cart using ternary logic*/}
        <button
          className="purchase-button"
          disabled={
            shoppingCart.length < 1 || calculateTotal() > currUser.points
              ? true
              : false
          }
          onClick={() => handleGamePurchase()}
        >
          Purchase
        </button>
        {calculateTotal() > currUser.points ? (
          <p style={{ color: "red" }}>Insufficient balance</p>
        ) : null}
      </div>
    </div>
  );
}

export default ShoppingCart;
