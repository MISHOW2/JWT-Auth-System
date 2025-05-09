import React, { useState, useEffect, useContext } from 'react';
import '../styles/login.css';
import { signup, login } from '../api/authServices';
import AuthContext from '../context/authContext';
import { useNavigate } from 'react-router-dom';


function LoginWrapper() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 
  const {setUser} = useContext(AuthContext)
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!isLogin && (!fullName || password !== confirmPassword)) {
      setError("Please fill in all fields correctly.");
      return;
    }

    try {
      if (isLogin) {
        const response = await login(email, password);
        setUser({email})
        console.log("Login successful:", response);
       navigate('/dashboard')
       
      } else {
        await signup(fullName, email, password);
        setSuccess("Signup successful! Redirecting to login...");

        setTimeout(() => {
          setIsLogin(true);  // ✅ Switch to login form
          setSuccess(null);  // ✅ Clear success message immediately
        }, 2000);
      }
    } catch (error) {
      console.error("Auth Error:", error.message);
      setError(isLogin ? "Login failed. Try again." : "Signup failed. Try again.");
    }
  };


 
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>} 


      {!isLogin && (
        <div className="input-container">
          <label htmlFor="fullName" className="input-label">Full Name</label>
          <input
            type="text"
            id="fullName"
            className="input-field"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required={!isLogin}
          />
        </div>
      )}

      <div className="input-container">
        <label htmlFor="email" className="input-label">Email</label>
        <input
          type="email"
          id="email"
          className="input-field"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="password" className="input-label">Password</label>
        <input
          type="password"
          id="password"
          className="input-field"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {!isLogin && (
        <div className="input-container">
          <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="input-field"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={!isLogin}
          />
        </div>
      )}

      {isLogin && (
        <div className="remember-me">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
      )}

      <button type="submit" className="login-btn">
        {isLogin ? "Log in" : "Sign Up"}
      </button>

      <div>
        {isLogin ? (
          <p>Don't have an account? <span onClick={() => setIsLogin(false)}>Sign up</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setIsLogin(true)}>Log in</span></p>
        )}
      </div>
    </form>
  );
}

export default LoginWrapper;
