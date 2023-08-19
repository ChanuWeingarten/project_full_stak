import { useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'

import image2 from './images/nn.jpg';
import logo from './images/wlogo.gif';
import SignUp from './SignUp';
import LogIn from './LogIn';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import About from './About'

export default function Home() {
  const data = JSON.parse(localStorage.getItem('currentUser'));
  const [login, setLogin] = useState(false);
  let navigate = useNavigate();

  const changeType = (e) => {
    debugger
    if (!data)
      setLogin('login')
    else if (e == "manager") {
      navigate('/manager')
    }
    else if (e == "member") {
      navigate('/member')
    }
    handleShow();

  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signUp = () => {
    setLogin('signup')
    navigate('/home/signup')
  }

  const logIn = () => {
    setLogin('login')
    navigate('/home/login')
  }

  const goToAbout = () => {
    window.scrollTo({
      top: 1100,
        behavior: "smooth",
    });
};

  return (
    <>

      <Navbar variant='dark tabs' collapseOnSelect expand="lg" bg="dark"  >
        <Container>
          <Nav.Link className="nav-link  text-warning h3 pe-auto " href='/home'>home</Nav.Link>
          <Nav.Link className="nav-link  text-warning h3 pe-auto about" onClick={goToAbout} >about</Nav.Link>
          <NavDropdown id="nav-dropdown-secondary-example pe-auto"
            title={
              <span className=" text-warning h3 bg-dark">log in </span>}
            menuVariant="dark" className='mtitle text-warning h3' style={{ color: '#FFC107' }}>
            <NavDropdown.Item onClick={() => changeType("manager")} variant="primary" > as a manager</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeType("member")} variant="primary">as a member </NavDropdown.Item>
          </NavDropdown>
        </Container>
        <Container className="justify-content-end">
          <Navbar.Brand href="Home" >
            <img src={logo} style={{ height: "90px", width: "auto" }} className="dologo"></img>
          </Navbar.Brand>
        </Container>
      </Navbar>
      {login == 'login'  && <LogIn signUp={signUp} show={show}  handleClose={handleClose} ></LogIn>}

      {login == 'signup'  && <SignUp logIn={logIn} show={show}  handleClose={handleClose} ></SignUp>}

      <div style={{
        backgroundImage: `url(${image2})`,
        backgroundSize: 'cover',
        width: "100vw",
        height: "100vh"
        }}>
      </div>
      <About></About>
     
    </>
  );
}
