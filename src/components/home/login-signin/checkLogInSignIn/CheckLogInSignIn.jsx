import React from "react";
import './CheckLogInSignIn.css'
import { Link, NavLink } from "react-router-dom";

export function CheckLogInSignIn({ value }) {
  return (
    <div className="check-find-">
      <Link style={{textDecoration:'none'}} to={'/login'} className={`check-find-select-${value === "login" ? "active" : ""}`}>Đăng nhập</Link>
      <Link style={{textDecoration:'none'}} to={'/sign-in'} className={`check-find-select-${value === "signIn" ? "active" : ""}`}>Đăng kí</Link>
    </div>
  );
}
