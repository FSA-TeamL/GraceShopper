import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';
import { useNavigate } from 'react-router-dom';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  console.log('the auth form name', name)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    console.log('formName', formName)
    dispatch(authenticate({ username, password, method: formName }));
    navigate("/products")
  };

  return (
    <div className='authForm'>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
          </label>
          <input name="username" type="text" placeholder='Email' />
        </div>
        <div>
          <label htmlFor="password">
          </label>
          <input name="password" type="password" placeholder='Password' />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
