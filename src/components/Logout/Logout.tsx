import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart, getCartFromLocal } from "../../store/cartSlice";
import { useAppDispatch } from "../../store/hooks";
import { getUserDataFromLocal, logout } from "../../store/userSlice";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        try {
            const loggingOut = async() => {
                await dispatch(logout());
                await dispatch(getUserDataFromLocal());
                await dispatch(clearCart());
                await dispatch(getCartFromLocal());
            }
            loggingOut();
            setTimeout(() => navigate("/"), 3000);
        } catch (err: any) {
            throw new Error(err);
        }
    }, []);
    
    return (
        <div>
            You have successfully logged out! Will be redirected shortly...
        </div>
    );
}

export default Logout;