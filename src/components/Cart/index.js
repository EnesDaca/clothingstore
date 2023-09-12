import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import PayPalButton from "./PayPalButton";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showPayPalButton, setShowPayPalButton] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const updateCart = (product, op) => {
    let tempProduct = { ...product };
    if (op === "add") tempProduct.quantity = 1;
    else tempProduct.quantity = -1;

    dispatch(actions.addCartItem(tempProduct));
  };

  const paymentSuccessHandler = (details) => {
    // Handle the successful payment and update your backend accordingly.
    console.log("Payment successful: ", details);
    setPaymentSuccess(true);
  };

  const paymentErrorHandler = (err) => {
    // Handle payment errors.
    console.error("Payment error: ", err);
    setPaymentSuccess(false);
  };

  const handleProceedToCheckout = () => {
    // Toggle the showPayPalButton state between true and false
    setShowPayPalButton((prevShowPayPalButton) => !prevShowPayPalButton);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          {cart.item.length === 0 ? (
            <div className="alert alert-info">
              Your cart is empty.{" "}
              <Link to={"/"} className="alert-link">
                Continue shopping
              </Link>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.item.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.imageSrc}
                        style={{ height: 50, width: 50 }}
                        alt={item.name}
                      />
                    </td>
                    <td>{parseFloat(item.price).toFixed(2)}</td>
                    <td>
                      <div>
                        <span
                          onClick={() =>
                            item.quantity <= 1 ? null : updateCart(item, "sub")
                          }
                        >
                          <i className="fa fa-minus" />
                        </span>
                        <input value={item.quantity} disabled />
                        <span onClick={() => updateCart(item, "add")}>
                          <i className="fa fa-plus" />
                        </span>
                      </div>
                    </td>
                    <td>{parseFloat(item.itemtotal).toFixed(2)}</td>
                    <td>
                      <span
                        onClick={() => dispatch(actions.removeCartItem(item))}
                      >
                        <i className="fa fa-close" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          {cart.item.length === 0 ? null : (
            <Link to={"/"} className="btn btn-success">
              {`Continue Shopping`}
            </Link>
          )}
        </div>
        <div className="col-lg-4 col-md-4 offset-md-2 offset-lg-2">
          <div className="alert alert-warning">
            <h6>Cart Total</h6>
            <ul>
              <li style={{ color: "#000" }}>
                Total :{" "}
                <span>{`$ ${parseFloat(cart.itemPriceTotal).toFixed(2)}`}</span>
              </li>
            </ul>
            {cart.item.length === 0 ? (
              <button className="btn btn-warning" disabled>
                Proceed To Checkout
              </button>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() => {
                  handleProceedToCheckout();
                }}
              >
                Proceed To Checkout
              </button>
            )}
            {showPayPalButton && (
              <div style={{ marginTop: "20px" }}>
                <PayPalButton
                  amount={parseFloat(cart.itemPriceTotal).toFixed(2)}
                  onSuccess={paymentSuccessHandler}
                  onError={paymentErrorHandler}
                />
              </div>
            )}
            {paymentSuccess && (
              <div
                className="alert alert-success"
                style={{ marginTop: "10px" }}
              >
                Payment was successful. Thank you!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
