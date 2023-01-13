import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
import { ShoppingCart } from 'phosphor-react';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  const id = useSelector((state) => state.auth.me.cartId);


  return (
    <div className='header'>
      <h1 className='siteTitle'>Welcome to the Store</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to={`/usercart/${id}`}>
              <ShoppingCart size={28}/>
            </Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/products">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to={`/cart`}>
              <ShoppingCart size={28}/>
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
