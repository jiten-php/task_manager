import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function UserPublic() {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to={'/todo'}/>;
  }else{
    return <Outlet/>;
  }
}

export default UserPublic;