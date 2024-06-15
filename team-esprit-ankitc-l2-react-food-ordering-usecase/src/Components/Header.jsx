import React, { useState, useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./AtomComponents/Button";
import Modal from "./Modal";
import { CartContext } from "../store/CartContext";
import Checkout from "./Checkout";
import Input from "./AtomComponents/Input";
import Cart from "./Cart";

const Header = () => {
    const cartCtx = useContext(CartContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openCheckout, setOpenCheckout] = useState(false);

    const handleCheckoutClose = () => {
        setOpenCheckout(false);
    };
    const handleCheckoutOpen = () => {
        setOpenCheckout(true);
        setIsModalOpen(false)
    };

    const totalCartItems = cartCtx.items.reduce((totalItems, item) => {
        return totalItems + item.quantity;
    }, 0);

    const totalPrice = cartCtx.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const openModal = () => {
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="website logo" />
                <h1>React Food</h1>
            </div>
            <nav>
                <Button textOnly onClick={openModal}>
                    Cart ({totalCartItems})
                </Button>
            </nav>
            <Cart openCart={isModalOpen} closeCart={closeModal} totalPrice={totalPrice} handleCheckoutOpen={handleCheckoutOpen} />
            <Checkout openCheckout={openCheckout} totalPrice={totalPrice} handleCheckoutClose={handleCheckoutClose} />
        </header>
    );
};

export default Header;
