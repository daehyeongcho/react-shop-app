import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";

function CartPage({ user }) {
  const dispatch = useDispatch();
  useEffect(() => {
    // 리덕스 user state 안에 cart 안에 상품이 들어있는지 확인
    const cartItems = [];
    if (user.userData && user.userData.cart && user.userData.cart.length > 0) {
      user.userData.cart.forEach((item) => {
        cartItems.push(item._id);
      });
      dispatch(getCartItems(cartItems, user.userData.cart));
    }
  }, [user.userData]);
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <UserCardBlock products={user.cartDetail} />
    </div>
  );
}

export default CartPage;
