import React from "react";
import { Routes, Route, Navigate } from "react-router";
import api from "../utils/api";
import Navbar from "./navbar";


const ProtectedRoute = ({Component}) => {
  
  if (api.Auth.isAuth()) {
        return (
          <div>
            <Navbar />  
            <Component />
          </div>
        );
  } else {
      return <Navigate to={{ pathname: "/" }} />;
  }
};

export default ProtectedRoute;
