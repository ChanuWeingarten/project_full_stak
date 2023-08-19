import { Routes, Route, useNavigate, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from  '../images/wlogo.gif';
import React from "react";
import { Container, Nav,Navbar } from 'react-bootstrap';



export default function MemberrNav(props) {
    let nevigate = useNavigate();
    const style= {width:"fitContent"}
    useEffect(() => {
      
        if(!JSON.parse(localStorage.getItem('currentUser')))
        nevigate('/home')
        else
        nevigate('/member')
    }, [])

    return (
        <>
         <Navbar className="navbar navbar-dark bg-dark navbar-expand-lg  tabs "  style={{zIndex:"inherit"}}>
         <Container>
         <Nav> <NavLink className="nav-link   text-warning h5" exact to="/member/mygroups" style={style}>my groups</NavLink>
        <NavLink className="nav-link  text-warning h5" exact to="/member/myoptionsgroups" style={style}>optional groups</NavLink>
          <NavLink className="nav-link  text-warning h5" exact to="/home" style={style}>home</NavLink>
          <NavLink className="nav-link  text-warning h5" exact to="/home/logout" style={style}>log out</NavLink></Nav>

                </Container>
                <Container>
                <img src={logo} style={{height:"80px", width: "auto",marginLeft:'70%'}} ></img>
                </Container>
                </Navbar>
        </>
    );
}
