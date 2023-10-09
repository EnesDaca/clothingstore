import React, { useState, useEffect } from "react";
import "./_productdetails.scss";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const { cart } = useSelector((obj) => obj);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const item = location.state;

  const updateCart = (product) => {
    // console.log(product, qty);
    let tmpProduct = { ...product, quantity: parseInt(qty) };
    dispatch(actions.addCartItem(tmpProduct));
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <img src={item.item.imageSrc} alt="clothing-store-source" />
        </div>
        <div className="col-lg-6">
          <div className="product_details_text">
            <h3>{item.name}</h3>
            <div className="rating">
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
            </div>
            <div className="product_details_price">
              {`$ ${parseFloat(item.item.price).toFixed(2)}`}
            </div>
            <p>Description goes here</p>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
            <button
              className="btn btn-danger"
              onClick={() => updateCart(item.item)}
            >
              {"Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
