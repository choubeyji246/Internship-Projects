import React, { useState } from "react";

import "./Card.css";
import getResponse from "../../utils/GetResponse";
import Button from "../AtomComponents/Button";

const Card = (props) => {

  const [productActive, setProductActive] = useState(false);
  const [data, setData] = useState();

  //console.log(props.product_id);

  const handleClick = async () => {
    try {
      const response = await getResponse(
        "get",
        `http://localhost:3000/products/productId?product_id=${props.product_id}`
      );
      if (response) {
        setData(response.data.data.data[0]);
        setProductActive(true);
      }
    } catch (error) {
      alert("No data found ");
    }
  };

  const handleClose = () => {
    setProductActive(false);
  };

  return (
    <div>
      {productActive ? (
        <div className="modal">
          <div className="modal-content">
            <div className="container">
              <h4>
                <b>Name: {data.product_name}</b>
              </h4>
              <p>type: {data.type}</p>
              <p>price: {data.price}</p>
              <p>Product-id: {data.product_id}</p>
              <p>Model: {data.product_model}</p>
              <p>Rating: ⭐{data.rating}</p>
              <p>
                Description: Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Deleniti accusamus dolore voluptas. Provident asperiores
                laboriosam numquam? Deleniti inventore deserunt velit rem quidem
                sunt architecto, in blanditiis maxime nihil eveniet cupiditate
                totam eum perferendis a! Nesciunt itaque voluptate qui,
                perferendis beatae expedita culpa excepturi quia commodi
                similique inventore animi debitis eveniet?
              </p>
            </div>

            <Button text="close" handleEvent={handleClose} />
          </div>
        </div>
      ) : null}

      <div
        className="card"
        style={{ marginRight: "spacingem" }}
        onClick={handleClick}
      >
        <img
          src="https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&aut
          o=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vYml
          sZSUyMHBob25lfGVufDB8fDB8fHww"
          alt="product"
          style={{ width: "100%" }}
        />
        <div className="container">
          <h4>
            <b>Name: {props.product_name}</b>
          </h4>
          <p>Product-id: {props.product_id}</p>
          <p>Model: {props.product_model}</p>
          <p>Rating:⭐{props.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
