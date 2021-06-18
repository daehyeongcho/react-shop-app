import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";

function CartPage({ user }) {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    // 리덕스 user state 안에 cart 안에 상품이 들어있는지 확인
    const cartItems = [];
    if (user.userData && user.userData.cart && user.userData.cart.length > 0) {
      user.userData.cart.forEach((item) => {
        cartItems.push(item._id);
      });

      // 카트에 들어있는 상품들 정보 가져오고 가격 총합 계산
      dispatch(getCartItems(cartItems, user.userData.cart)).then((response) => {
        setTotal(
          response.payload.reduce(
            (acc, obj) => acc + obj.price * obj.quantity,
            0
          )
        );
      });
    }
  }, [user.userData]);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <UserCardBlock products={user.cartDetail} />
      <div style={{ marginTop: "3rem" }}>
        <h2>Total Amount: ${total}</h2>
      </div>
    </div>
  );
}

export default CartPage;
