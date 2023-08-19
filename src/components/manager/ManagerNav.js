import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from "react";
import logo from '../images/wlogo.gif';
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap';

export default function ManagerNav() {

    let nevigate = useNavigate();
    const style = { width: "fitContent" }
    const data = JSON.parse(localStorage.getItem('currentUser'));
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('currentUser')))
            nevigate('/home')
        else
            nevigate('/manager')
    }, [])

    return (
        <>
            <Navbar className="navbar navbar-dark bg-dark navbar-expand-lg  tabs " >
                <Container>
                    <div><img style={{width:'80px',height:'80px',zIndex:"0"}} src={require('../images/manager.png')}></img>
                    {data && <div style={{color:'#f3f0e8',position:'fixed',top:'6.5%',left:'1.4%'}}>  {data.first_name}</div>}
                    </div>
                    <Nav> <NavLink className="nav-link  text-warning h5" exact to="/manager/mygroups" style={style}>my groups</NavLink></Nav>
                    <Nav>  <NavLink className="nav-link  text-warning h5" exact to="/manager/newgroup" style={style}>open new group</NavLink> </Nav>
                    <Nav><NavLink className="nav-link  text-warning h5" exact to="/home" style={style}>home</NavLink> </Nav>
                    <Nav> <NavLink className="nav-link  text-warning h5" exact to="/home/logout" style={style}>log out</NavLink></Nav>
                </Container>
                <Container>
                    <img src={logo} className="navbar-brand" style={{ height: "80px", width: "auto", marginLeft: '70%' }}></img>
                </Container>
            </Navbar>
        </>
    );
}
