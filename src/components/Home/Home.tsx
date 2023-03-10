import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllProducts, getProducts, getProductsFromLocal } from "../../store/productSlice";
import ProductDisplayCard from "../ProductDisplayCard/ProductDisplayCard";
import './Home.css';

const Home = () => {
    const products = useAppSelector(getProducts);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        retrieveProducts();
    }, [])

    const retrieveProducts = async () => {
        try {
            await dispatch(getAllProducts());
            await dispatch(getProductsFromLocal());
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const goToProduct = (id: number) => {
        navigate(`/product/${id}`);
    }

    return (
        <>
            <h2>Video Games</h2>
            <div className="products-grid">
                { products.length > 0 &&
                    products?.map((product: any) => {
                        return <ProductDisplayCard onClick={() => goToProduct(product.id)} key={product.id} price={product.price} name={product.name} console={product.console} url={product.url} edition={product.edition}/>
                    })
                }
            </div>
        </>
    );
};

export default Home;