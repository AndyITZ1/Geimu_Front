import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartItem } from "../../interfaces/CartItem";
import { addToCart, getCart, getCartFromLocal } from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCurrProduct, getProductById } from "../../store/productSlice";
import { getUser, getUserDataFromLocal } from "../../store/userSlice";
import './Product.css';

const Product = () => {
    const { id } = useParams();
    const productId = Number(id); 
    const product = useAppSelector(getCurrProduct);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(getUser);

    const [quantity, setQuantity] = useState(1);

    const retrieveProduct = async () => {
        try {
            await dispatch(getProductById(productId));
        } catch (err: any) {
            throw new Error(err);
        }
    }

    useEffect(() => {
        dispatch(getUserDataFromLocal());
        try {
            retrieveProduct();
        } catch (err: any) {
            throw new Error(err);
        }
    }, [])

    const decrementQ = () => {
        if (quantity === 1)
            setQuantity(1);
        else
            setQuantity(quantity - 1);
    }

    const incrementQ = () => {
        setQuantity(quantity + 1);
    }

    const pushToCart = async () => { 
        if (Object.keys(user).length > 0) {
            const payload: CartItem = {
                name: product.name,
                price: product.price,
                url: product.url,
                quantity: quantity
            };
            try {
                await dispatch(addToCart(payload));
                await dispatch(getCartFromLocal());
            } catch (err: any) {
                throw new Error(err);
            }
        }
    }

    return (
        <div className="product-container">
            { Object.keys(product).length > 0 &&
                <>
                    <div className="img-product">
                        <img src={product.url} alt={product.name}/>
                    </div>
                    <div className="product-desc">
                        <h1>{product.name}</h1>
                        { product["console"] !== undefined &&
                            <h2>Console: {product.console}</h2>
                        }
                        { product["edition"] !== undefined &&
                            <h2>Edition: {product.edition}</h2>
                        }
                        { product["height"] !== undefined &&
                            <h2>Height: {product.height}</h2>
                        }
                        { product["width"] !== undefined &&
                            <h2>Width: {product.width}</h2>
                        }
                        <h2 className="desc">Description</h2>
                        <h3 className="desc-detail">{product.description}</h3>
                        { product["price"] !== undefined && 
                            <h2 className="pc">Price: <span>$</span>{product.price}</h2>
                        }
                        <div className="quantity-selector">
                            <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decrementQ}>
                                &mdash;
                            </button>
                            <input className="quantity-input__screen" type="text" value={quantity} readOnly />
                            <button className="quantity-input__modifier quantity-input__modifier--right" onClick={incrementQ}>
                                &#xff0b;
                            </button>  
                        </div>
                        <button className="product-button" onClick={pushToCart}>Add To Cart</button>
                    </div>
                </>
            }
        </div>
    )
};


export default Product;