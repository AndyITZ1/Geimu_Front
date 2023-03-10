import { useEffect, useState } from "react";
import { CartItem } from "../../interfaces/CartItem";
import { getCart, getCartFromLocal } from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserDataFromLocal } from "../../store/userSlice";
import './Checkout.css';

const Checkout = () => {
    const cart: CartItem[] = useAppSelector(getCart);
    const dispatch = useAppDispatch();
    // let cartList = new Map();

    useEffect(() => {
        dispatch(getCartFromLocal());
        dispatch(getUserDataFromLocal());
        refineCart();
    }, [])

    const refineCart = () => {
        console.log(cart);
        let finalCart = new Map();
        if (cart.length > 0) {
            cart.map((product: CartItem) => {
                if (finalCart.has(product.name)) {
                    let oldItem = finalCart.get(product.name);
                    finalCart.set(product.name, {
                        url: oldItem.url,
                        price: oldItem.price,
                        quantity: oldItem.quantity + product.quantity
                    });
                }
                else {
                    finalCart.set(product.name, {
                        url: product.url,
                        price: product.price,
                        quantity: product.quantity
                    });
                }
            })
        }
        // setCartList(finalCart);
        console.log(finalCart);
        // cartList = finalCart;
    }

    return (
        <div className="checkout-container">
            <div className="cart">
                <h1>Cart</h1>
                <div className="cart-item-header">
                    <h3 className="cart-img cart-img-title">Product Image</h3>
                    <h3 className="cart-product-name">Product Name</h3>
                    <h3 className="cart-product-quantity">Quantity</h3>
                    <h3 className="cart-product-price">Price</h3>
                </div>
                {/* <div className="cart-item">
                    <img className="cart-img" src="testImage" alt="testImage"></img>
                    <p className="cart-product-name">Product Name</p>
                    <p className="cart-product-quantity">1</p>
                    <p className="cart-product-price">$129.99</p>
                </div> */}
                {/* {
                    cartList.forEach((obj, name) => {
                        return <div key={name} className="cart-item">
                                    <img className="cart-img" src={obj.url} alt={name}></img>
                                    <p className="cart-product-name">{name}</p>
                                    <p className="cart-product-quantity">{obj.quantity}</p>
                                    <p className="cart-product-price">${obj.price}</p>
                                </div>
                    })
                } */}
            </div>
            <div className="checkout-cart">
                <h1>Total: $500.99</h1>
                <button>Finalize Purchase</button>
            </div>

        </div>
    );
}

export default Checkout;