import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import { Empty, Result } from "antd";
import Paypal from "../../utils/Paypal";

function CartPage({ user }) {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
        setShowTotal(true);
      });
    }
  }, [user.userData]);

  const onRemove = (productId) => {
    dispatch(removeCartItem(productId)).then((response) => {
      if (response.payload.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  };

  const transactionSuccess = (payment) => {
    dispatch(
      onSuccessBuy({
        paymentData: payment,
        cartDetail: user.cartDetail,
      })
    ).then((response) => {
      if (response.payload.success) {
        setShowTotal(false);
        setShowSuccess(true);
      }
    });
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <UserCardBlock products={user.cartDetail} onRemove={onRemove} />

      {showTotal ? (
        <>
          <div style={{ marginTop: "3rem" }}>
            <h2>Total Amount: ${total}</h2>
          </div>
          <Paypal total={total} onSuccess={transactionSuccess} />
        </>
      ) : showSuccess ? (
        <Result status="success" title="Successfully Purchased Items" />
      ) : (
        <>
          <br />
          <Empty description={false} />
          <h3>No Items in the Cart</h3>
        </>
      )}
    </div>
  );
}

export default CartPage;
