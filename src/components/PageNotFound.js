import React from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Home from "./Home";
import { Navigate, useNavigate } from "react-router";
function PageNotFound() {
    const navigate= useNavigate();
    const BackToHome=()=>navigate("/Home")
        return (
        <div style={{marginLeft:"45vw"}} >
            <h1>ERROR </h1>
            <h2>404</h2>
            <h3>Page isnt found</h3>
           <Button onClick={BackToHome}></Button>
        </div>
    );
}
export default PageNotFound;