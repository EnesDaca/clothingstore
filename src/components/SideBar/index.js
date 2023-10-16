import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/product";
import "./_sidebar.scss";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((obj) => obj);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [filter, setFilter] = useState({});
  const [categoryVisibility, setCategoryVisibility] = useState({});

  useEffect(() => {
    dispatch(actions.getProductCategories());
  }, [dispatch]);

  // Initialize categoryVisibility to make all categories visible initially
  useEffect(() => {
    const initialVisibility = {};
    product.categories.forEach((item) => {
      initialVisibility[item.Id] = true;
    });
    setCategoryVisibility(initialVisibility);
  }, [product.categories]);

  const toggleCategory = (categoryId) => {
    setCategoryVisibility((prevVisibility) => ({
      ...prevVisibility,
      [categoryId]: !prevVisibility[categoryId],
    }));
  };

  const applyFilter = (item) => {
    let tmpFilter = {
      ...filter,
      categoryId: item.map((x) => x.Id),
    };

    setFilter(tmpFilter);

    if (tmpFilter.categoryId.length > 0)
      dispatch(actions.applyFilter(tmpFilter, product));
    else dispatch(actions.applyFilter(null, product));
  };

  const checkboxchange = (e, item) => {
    let categories = [...categoryFilter];

    if (!e.target.checked) {
      categories = categories.filter((x) => x.Id !== item.Id);
    } else if (e.target.checked) {
      categories.push(item);
    }
    setCategoryFilter(categories);

    applyFilter(categories);
  };

  return (
    <div>
      <div className="sidebar_category">
        <div className="section-title">
          <h4>Categories</h4>
        </div>
        {product.categories.map((item, index) => {
          const isCategoryVisible = categoryVisibility[item.Id];

          return (
            <div className="category_accordion" key={index}>
              <div className="accordion">
                <div
                  className="card-heading"
                  onClick={() => toggleCategory(item.Id)}
                >
                  <span>{item.Category}</span>
                </div>
                {isCategoryVisible && (
                  <div className="card-body">
                    <ul>
                      {item.SubCategory.map((subitem, ind) => (
                        <li key={ind}>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              value={subitem.Id}
                              name={subitem.Name}
                              className="form-check-input"
                              onChange={(e) => checkboxchange(e, subitem)}
                              checked={
                                categoryFilter.find((x) => x.Id === subitem.Id)
                                  ? true
                                  : false
                              }
                            ></input>
                            <label
                              className="form-check-label"
                              style={{ color: "#000" }}
                            >
                              {subitem.Name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="sidebar_category">
        <div className="section-title">
          <h4>Shop by price</h4>
        </div>
        <div>
          {`Price : $${filter?.price?.min || 0}-$${filter?.price?.max || 0}`}
          <div>
            <p>
              {`Min: `}
              <input
                type="range"
                id="min"
                min={1}
                max={150}
                step={1}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    price: {
                      ...filter.price,
                      min: parseInt(e.target.value),
                    },
                  });
                }}
              />
            </p>
            <p>
              {`Max: `}
              <input
                type="range"
                id="max"
                min={1}
                max={150}
                step={1}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    price: {
                      ...filter.price,
                      max: parseInt(e.target.value),
                    },
                  });
                }}
              />
            </p>
          </div>
          <button
            className="btn-sidebar"
            onClick={() => dispatch(actions.applyFilter(filter, product))}
          >
            {"Apply prices"}
          </button>
          <button
            className="btn-sidebar"
            onClick={() => {
              setFilter({});
              setCategoryFilter([]);
              dispatch(actions.applyFilter(null, product));
            }}
          >
            {"Remove all filters"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
