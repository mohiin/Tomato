
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { clearCart, getCartData, removeFromCart } from "../../redux/cartSlice";

export default function Cart() {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const cartData = useSelector((state) => state.cart.cartData) || []; // Cart data from Redux
  const totalAmount = useSelector((state) => state.cart.totalAmount); // Total amount from Redux
  
  useEffect(() => {
    if (user) {
      dispatch(getCartData(user)); // Fetch cart data from Redux
    } else {
      dispatch(clearCart()); // Reset cart if user is not available
    }
  }, [dispatch, user]); // Re-run the effect when `user` changes

  // Dispatch removeFromCart action
  const handleRemoveFromCart = async (itemId) => {
    if (user) {
      dispatch(removeFromCart({ userId: user._id, itemId }));
      toast.success("Item removed!");
    } else {
      console.log("User not logged in");
      toast.error("You are not logged in");
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {
          cartData.map((item, index) => {
            if (item.quantity > 0) {
              return <div key={index}>
                <div className="cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{item.quantity}</p>
                  <p>${item.price * item.quantity}</p>
                  <p className="cross" onClick={() => handleRemoveFromCart(item._id)}>X</p>
                </div>
                <hr />
              </div>
            }
          })
        }
        {
          totalAmount === 0 && <h2>Add some foods</h2>
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtoal</p>
            <p>${totalAmount}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${totalAmount && 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>${totalAmount ? totalAmount + 2 : 0}</p>
          </div>
          <button className={totalAmount > 0 ? "disabled": ""} disabled={totalAmount <= 0} onClick={() => navigate("/order")}>Proceed To Checkout</button>
        </div>

        <div className="promo-code">
          <p>Enter your promo code here</p>
          <div className="promo-code-input">
            <input type="text" placeholder="promo code" />
            <button>submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}