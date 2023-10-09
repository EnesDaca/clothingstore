import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import {
  // selectProducts,
  selectFilteredProduct,
} from "../../redux/selectors/selectors";

import "./_product.scss";

const Product = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const products = useSelector(selectProducts);
  const filteredProduct = useSelector(selectFilteredProduct);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(actions.getProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("FROM REDUCER", cart);
  }, [cart]);

  const addCartItem = (item) => {
    console.log(item);
    dispatch(actions.addCartItem(item));
  };

  return (
    <div className="row">
      {filteredProduct.map((item, index) => (
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div className="product__item__pic">
              <img
                className="product__item__pic"
                src={item.imageSrc}
                alt={item.name}
              />
              <ul className="product__hover">
                <li>
                  <a href={item.imageSrc}>
                    <span className="fa fa-arrows-alt" />
                  </a>
                </li>
                <li>
                  <button onClick={() => addCartItem(item)}>
                    <span className="fa fa-shopping-cart" />
                  </button>
                </li>
              </ul>
            </div>
            <div className="product__item__text">
              <h6>
                <button
                  onClick={() => {
                    navigate("./productdetails", {
                      state: { item },
                    });
                  }}
                >
                  {item.name}
                </button>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">{item.price} $</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
