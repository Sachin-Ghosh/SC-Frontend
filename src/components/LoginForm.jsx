import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import './LoginForm.css';
import { NavLink } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    //console.log('Login:', email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <animated.div style={inputAnimation}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="futuristic-input"
        />
      </animated.div>
      <animated.div style={inputAnimation}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="futuristic-input"
        />
      </animated.div>
      <NavLink to='/home'> 
      <animated.button
        type="submit"
        className="futuristic-button"
        style={inputAnimation}
      >

        Login
      </animated.button>
      </NavLink>
    </form>
  );
};

export default LoginForm;

