import React from "react";
import "./UserCardBlock.css";

function UserCardBlock({ products }) {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      const image = images[0];
      return `${process.env.REACT_APP_API_URL}/${image}`;
    }
  };
  const renderCartItems = () =>
    products &&
    products.map((product) => (
      <tr key={product._id}>
        <td>
          <img
            style={{ width: "70px" }}
            alt="product"
            src={`${process.env.REACT_APP_API_URL}/${product.images[0]}`}
          />
        </td>
        <td>{product.quantity} EA</td>
        <td>$ {product.price}</td>
        <td>
          <button>Remove</button>
        </td>
      </tr>
    ));
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>{renderCartItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
