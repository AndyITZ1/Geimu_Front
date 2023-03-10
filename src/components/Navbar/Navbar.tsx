import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUser, getUserDataFromLocal} from "../../store/userSlice";
import "./Navbar.css";

const Navbar = () => {
    const user = useAppSelector(getUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserDataFromLocal());
    }, [])

    return (
        <>
        <nav className="nav">
            <Link className="logo-link" to="/">
                <img id="logo" src="/logo.png" alt="Logo"/>
            </Link>
            <ul id="links">
                { JSON.stringify(user) !== '{}' ? 
                    <>
                        <img id="flag" src={`https://flagcdn.com/32x24/${user.address.country}.png`} alt={user.address.country}/>
                        <h4>Hello, {user.firstName}</h4>
                        <li>
                            <Link to="/checkout">Checkout</Link>
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
        </>
    );
}

export default Navbar;