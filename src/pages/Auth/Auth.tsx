import { useState } from "react";
import axios from "axios";
import styles from "./Auth.module.css";
import { useTokenStore } from "../../store/token";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useTokenStore((state) => state.setToken);
  const navigate = useNavigate();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/auth/login", {
        email,
        password,
      });
      setToken(response.data.token);
      navigate("/dashboard");
      console.log("Sesión iniciada con éxito");
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <h2 className={styles.h2}>Iniciar Sesión</h2>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Correo Electrónico:
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              Contraseña:
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
