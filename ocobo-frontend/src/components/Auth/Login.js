// src/components/Auth/Login.js

import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Hook para navegar entre rutas
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/login", { email, password });
            localStorage.setItem("token", response.data.token); // Guardar el token en localStorage

            // Redirigir al dashboard si el login es exitoso
            navigate("/dashboard");
        } catch (err) {
            setError("Credenciales inválidas");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
