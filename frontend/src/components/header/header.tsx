import { ComponentState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import InfoUser from '../../models/infoUser';
import './header.css'
import Role from '../../models/role';


function Header() {

  const info: InfoUser = useSelector((state: ComponentState) => state.userReducer)

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" className='headerNav'>
        <Container>
          <Navbar.Brand as={Link} to="/" >Home</Navbar.Brand>

          {info.user &&
            <>
              <Nav className="me-auto">
                <div className='headerUser'>
                  <Nav.Link as={Link} to="/vacations" >Vacations</Nav.Link>
                  {info.user.role == Role.Admin && <Nav.Link as={Link} to="/chart" >Chart</Nav.Link>}
                </div>
              </Nav>
              <Nav>
                <Nav.Link as={Link} to="/logout"> Logout </Nav.Link>
              </Nav>
            </>}

          {!info.user &&
            <>
              <Nav>
                <div className='headerLogin'>
                  <Nav.Link as={Link} to="/login"> Login </Nav.Link>
                  <Nav.Link as={Link} to="/register"> Register </Nav.Link>
                </div>
              </Nav>
            </>}

        </Container>
      </Navbar>


      <h1 className='headerTitle'>Hello {!info.user && "Guest"} {info.user?.firstName} {info?.user?.role == Role.Admin && "(Admin)"}</h1>
    </>
  );
}

export default Header;






