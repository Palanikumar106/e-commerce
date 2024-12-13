import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart({ cartItems, setCartItems }) {
  const [complete, setComplete] = useState(false);
  function submitOrder() {
    fetch(process.env.REACT_APP_API_URL + "/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    }).then(() => {
      setCartItems([]);
      setComplete(true);
      toast.success("Success fully Added");
    });
  }

  function increase(item) {
    if (item.qty < item.product.stock) {
      setCartItems(
        cartItems.map((i) => {
          if (i.product._id == item.product._id) {
            i.qty++;
          }
          return i;
        })
      );
    }
  }
  function decrease(item) {
    if (item.qty > 1) {
      setCartItems(
        cartItems.map((i) => {
          if (i.product._id == item.product._id) {
            i.qty--;
          }
          return i;
        })
      );
    }
  }
  return cartItems.length > 0 ? (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart: <b>{cartItems.length} items</b>
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems.map((item) => (
              <Fragment>
                <hr />
                <div classNameq="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.product.images[0].image}
                        alt={item.product.name}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={"/product/" + item.product._id}>
                        {item.product.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${item.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() => decrease(item)}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.qty}
                          readOnly
                        />

                        <span
                          className="btn btn-primary plus"
                          onClick={() => increase(item)}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        onClick={() =>
                          setCartItems(
                            cartItems.filter(
                              (items) => items.product._id !== item.product._id
                            )
                          )
                        }
                        className="fa fa-trash btn btn-danger"
                      ></i>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              </p>
              <p>
                Est. total:{""}
                <span className="order-summary-values">
                  $
                  {Number(
                    cartItems.reduce(
                      (acc, item) => acc + item.qty * item.product.price,
                      0
                    )
                  ).toFixed(2)}
                </span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={submitOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : !complete ? (
    <Fragment>
      <h2 className="mt-5">Your Cart is Empty!</h2>
      <h3 className="mt-5">
        Visit <Link to="/">Home</Link> to prurchase
      </h3>
    </Fragment>
  ) : (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">Order Complete!</h2>
        <p>Your order has been placed succesfully.</p>
      </div>
    </Fragment>
  );
}
