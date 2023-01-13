import React from 'react';
import { useSelector } from 'react-redux';
import { me } from '../auth/authSlice';

/**
 * COMPONENT
 */
const Home = (props) => {

  console.log("what are props on the home page?", props)
  const username = useSelector((state) => state.auth.me.username);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin)

  return (
    <div>
      <h3>Welcome, {username}</h3>
      {isAdmin ? <p>You have admin access!</p> : <p>Sorry, You don't have admin access!</p>}
    </div>
  );
};

export default Home;
