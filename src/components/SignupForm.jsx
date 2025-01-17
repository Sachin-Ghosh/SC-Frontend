import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import './LoginForm.css';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    //console.log('Signup:', name, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <animated.div style={inputAnimation}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="futuristic-input"
        />
      </animated.div>
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
      <animated.button
        type="submit"
        className="futuristic-button"
        style={inputAnimation}
      >
        Sign Up
      </animated.button>
    </form>
  );
};

export default SignupForm;

