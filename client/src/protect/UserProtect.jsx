import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function UserProtect() {
    const navigate = useNavigate()

  const token = localStorage.getItem("token");
  if (token) {
    return <Outlet/>;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default UserProtect;
