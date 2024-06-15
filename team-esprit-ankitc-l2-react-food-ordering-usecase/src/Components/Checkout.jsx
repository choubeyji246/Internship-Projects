import React, { useContext, useState } from "react";

import { CartContext } from "../store/CartContext";
import getResponse from "../utils/GetResponse";
import fetchLocation from "../utils/location";
import Button from "./AtomComponents/Button";
import Input from "./AtomComponents/Input";
import Modal from "./Modal";

const Checkout = ({ openCheckout, totalPrice, handleCheckoutClose }) => {
  const cartCtx = useContext(CartContext);
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  //const [data, setData]= useState([])

  const handleInputValues = (event) => {
    setInputValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await getResponse(
        "post",
        "http://localhost:3000/orders",
        {
          order: { items: cartCtx.items, customer: inputValues },
        }
      );
      console.log(response.status);
      if (response.status === 201) {
        setOrderSubmitted(true);
        cartCtx.clearCart();
      }
      setInputValues({
        name: "",
        email: "",
        street: "",
        postalCode: "",
        city: "",
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleCloseModal = () => {
    setOrderSubmitted(false);
    handleCheckoutClose();
  };

  const handleLocation = async () => {
    const { road, city, postcode } = await fetchLocation();
    // console.log("Comment",road,city,postcode);

    setInputValues((prev) => ({
      ...prev,
      street: road,
      city: city,
      postalCode: postcode,
    }));
  };

  //console.log(inputValues);
  return (
    <>
      {openCheckout && !orderSubmitted && (
        <Modal onClose={handleCheckoutClose}>
          <h3>Checkout</h3>
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>

          <Input
            type="text"
            label="Full Name"
            name="name"
            id="name"
            placeholder="Enter your name..."
            value={inputValues.name}
            onChange={handleInputValues}
          />
          <Input
            type="email"
            label="Email"
            name="email"
            id="email"
            placeholder="Enter your email..."
            value={inputValues.email}
            onChange={handleInputValues}
          />

          <Input
            type="text"
            label="Street"
            name="street"
            id="street"
            placeholder="Enter your street..."
            value={inputValues.street}
            onChange={handleInputValues}
          />
          <div className="control-row">
            <Input
              type="text"
              label="Postal Code"
              name="postalCode"
              id="postalCode"
              placeholder="Enter your pin code..."
              value={inputValues.postalCode}
              onChange={handleInputValues}
            />
            <Input
              type="text"
              label="City"
              name="city"
              id="city"
              placeholder="Enter your city..."
              value={inputValues.city}
              onChange={handleInputValues}
            />
          </div>
          <Button onClick={handleLocation}>Get Current Location</Button>
          <p className="modal-action">
            <Button onClick={handleSubmit}>Submit Order</Button>
          </p>
        </Modal>
      )}
      {orderSubmitted && (
        <Modal onClose={handleCloseModal}>
          <h2>Success!</h2>
          <p>Your Order was submitted successfully</p>
          <p>
            We will get back to you with more details via email within the next
            few minutes
          </p>
          <p className="modal-actions">
            <Button onClick={handleCloseModal}>OK</Button>
          </p>
        </Modal>
      )}
    </>
  );
};

export default Checkout;
