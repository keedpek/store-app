import React, { useContext } from 'react';
import { Context } from '..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';


const NavBar = observer(() => {
  const navigate = useNavigate()
  const {user} = useContext(Context) 

  const logOut = () => {
    navigate(LOGIN_ROUTE)
    user.setUser({})
    user.setIsAuth(false)
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavLink style={{color: 'white', textDecoration: 'none'}} to={SHOP_ROUTE}>Магазин на диване</NavLink>
          {user.isAuth ?
            <Nav className="ml-auto">
              <Button 
                variant='outline-light'
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Админка
              </Button>
              <Button 
                variant='outline-light' 
                style={{marginLeft: '4px'}} 
                onClick={() => logOut()}
              >
                Выйти
              </Button>
            </Nav>
            :
            <Nav className="ml-auto">
              <Button 
               variant='outline-light' 
               onClick={() => {
                navigate(LOGIN_ROUTE)
              }}
              >
                Авторизация
              </Button>
            </Nav>
          }
        </Container>
      </Navbar>
  );
});

export default NavBar;
