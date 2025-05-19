import React, { useState } from "react";
import useCartStore from "../../data/cartStore.js";
import "./Order.css";
import minusImg from "../../assets/minus-icon-black.svg";
import plusImg from "../../assets/plus-icon-black.svg";

function Order() {
  const { cart, removeFromCart, addToCart, totalPrice, productDataList } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  function findQuantity(id) {
    const quantity = cart.find((item) => item.id === id);
    return quantity.quantity;
  }

  // Clicking this div will open or close the cart.
  return (
    <div className={`cart-wrapper ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
      <button
        className="toggle-button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? "Close" : "See your order here!"}   {/* Button text changes based on isOpen */}
        
      </button>
      <div className="cart" onClick={(e) => e.stopPropagation()}>  {/*prevents the click from closing the cart if user interacts inside */}
        <div className="cart-header">
          <p className="cart-heading">Quantity</p>
          <p className="cart-heading">Product</p>
          <p className="cart-heading">Price</p>
        </div>

        <div className="cart-body"> 
          {cart.length === 0 ? (
            <div className="empty-order">
              <p>You haven't added anything yet!</p>
            </div>
          ) : (
            productDataList
            // Filter only those products that are in the cart
              .filter((item) => cart.find((cartItem) => cartItem.id === item.id))
               // For each filtered product, create a row in the cart
              .map((item) => (
                <div className="cart-row" key={item.id}>
                  <div className="cart-cell">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); //  Stops the click from affecting parent (like closing the cart)
                        removeFromCart(item);
                      }}
                    >
                      <img className="icon" src={minusImg} alt="minus icon" />
                    </button>
                       {/* Shows current quantity of the item */}
                    <span className="order-quantity">{findQuantity(item.id)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();// Stop event from bubbling up to parent
                        addToCart(item);
                      }}
                    >
                      <img className="icon" src={plusImg} alt="plus icon" />
                    </button>
                  </div>
                  <div className="cart-item">
                    <img className="order-img" src={item.img} alt="" />{" "}
                    <span className="cart-info">
                      {item.name}
                      <p>{item.price}:-</p>
                    </span>
                  </div>
                  <div className="cart-cell">
                    <p>{findQuantity(item.id) * item.price}:-</p>
                  </div>
                </div>
              ))
          )}
        </div>

        <div className="cart-footer">
          <p>Totalprice</p>
          <div className="total-price">{totalPrice}:-</div>
        </div>
      </div>
    </div>
  );
}

export default Order;
