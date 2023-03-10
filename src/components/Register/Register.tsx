import data from '../../data/states.json';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCountries } from '../../store/flagSlice';
import { register } from '../../store/userSlice';


const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const countries = useAppSelector((state: any) => state.flags.countryCodes);

    useEffect(() => {
        retrieveCountries();
    }, [])

    const retrieveCountries = async () => {
        try {
            await dispatch(getCountries());
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const registerAction = async () => {
        const payload = {
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email,
            address: {
                street,
                city,
                state,
                country,
                zipCode
            }
        }

        try {
            await dispatch(register(payload));
            navigate("/login");
        } catch (err: any) {
            throw new Error(err);
        }
    };

    
    
    return (
        <div className="flex-register-column">
            <div className="form-register-container">
                    <h2 className="gradient-text registration">Register</h2>
                    <div className="register-inputs">
                        <div className="register-col">
                            <div className="register-comp short-register">
                                <input className="auth-text-register" onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name"></input>
                                <input className="auth-text-register" onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name"></input>
                            </div>
                            <div className="register-comp">
                                <input className="auth-text-register" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input>
                            </div>
                            <div className="register-comp">
                                <input className="auth-text-register" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input>
                            </div>
                        </div>
                        <div className="register-col">
                            <div className="register-comp">
                                <input className="auth-text-register" onChange={(e) => setStreet(e.target.value)} type="text" placeholder="Address Line"></input>
                            </div>
                            <div className="register-comp">
                                <input className="auth-text-register" onChange={(e) => setCity(e.target.value)} type="text" placeholder="City"></input>
                            </div>
                            <div className="register-comp short-register">
                                {country === "us" && 
                                    <select name="states" id="states" onChange={(e) => setState(e.target.value)}>
                                        <option value="" disabled selected>State</option>
                                        {
                                            data.states.map((state) => {
                                                return <option key={state} value={state}>{state}</option>;
                                            })
                                        }
                                    </select>
                                }
                                <select className="country-select" name="countries" id="countries" onChange={(e) => setCountry(e.target.value)}>
                                    <option value="" disabled selected>Country</option>
                                    {
                                        Object.keys(countries).map((code) => {
                                            if (code.length == 2) {
                                                return <option key={code} value={code}>{countries[code]}</option>;
                                            }
                                        })
                                    }
                                </select>
                                <input className="zipcode-input" onChange={(e) => setZipCode(e.target.value)} type="text" placeholder="ZipCode"></input>
                            </div>
                        </div>
                    </div>
                    <button id="register-button" type="submit" onClick={registerAction}>Register</button>
                    <div className="redirect-login">
                        <h4>Have an account?</h4>
                        <Link to="/login">Sign in here!</Link>
                    </div>
                </div>  
        </div>
    );
}

export default Register;