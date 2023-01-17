import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, selectUsers } from "./UsersSlice";
import { useParams, useNavigate } from "react-router-dom";

const Users = () => {
  const users = useSelector(selectUsers);
  console.log("this is what we get for users", users);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.me);

  const { id } = useParams();

  return (
    <>
      <div className="allProductsBackground">
        {user && user.isAdmin === true ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Username/Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Users;
