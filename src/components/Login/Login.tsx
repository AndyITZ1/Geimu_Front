import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { getUserDataFromLocal, login } from "../../store/userSlice";
import "./Login.css";

const Login: React.FC<any> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const loginAction = async (event: any) => {
        event.preventDefault();
        const payload = {
            email,
            password
        }
        try {
            await dispatch(login(payload));
            await dispatch(getUserDataFromLocal());
            navigate("/");
        } catch (err: any) {
            throw new Error(err);
        }
    }

    return (
        <div className="flex-login-column">
            <div className="form-login-container">
                <h2 className="gradient-text registration">Login</h2>
                <div className="login-comp">
                    <input className="auth-text" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input>
                </div>
                <div className="login-comp">
                    <input className="auth-text" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input>
                </div>
                <button id="login-button" type="submit" onClick={loginAction}>Login</button>
                <div className="redirect-register">
                    <h4>Don't have an account!</h4>
                    <Link to="/register">Sign up now!</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;