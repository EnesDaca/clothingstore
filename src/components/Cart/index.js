import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

const Cart = (props) => {
  const { cart } = useSelector((obj) => obj);
  const dispatch = useDispatch();

  const updateCart = (product, op) => {
    let tempProduct = { ...product };
    if (op === "add") tempProduct.quantity = 1;
    else tempProduct.quantity = -1;

    dispatch(actions.addCartItem(tempProduct));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
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
              {cart.item.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.imageSrc}
                        style={{ height: 50, width: 50 }}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <Link to={"/"} className="btn btn-success">
            {`Continue Shopping`}
          </Link>
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
            <btn className="btn btn-warning">{`Proceed To Checkout`}</btn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
