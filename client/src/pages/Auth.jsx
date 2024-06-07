import React, { useContext, useState } from "react";
import { Container, Form, Card, Button, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { registration, login } from "../http/userAPI";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const Auth = observer(() => {
  const location = useLocation()
  const isLoginPage = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const click = async () => {
    try {
      let response
      if (isLoginPage) {
        response = await login(email, password)
      } else {
        response = await registration(email, password)
      }
      user.setUser(response)
      user.setIsAuth(true) 
      navigate(SHOP_ROUTE)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <Container 
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 600}} className="p-4">
        <h2 className="m-auto">
          {isLoginPage ? 'Авторизация' : 'Регистрация'}
        </h2>
        <Form className="d-flex flex-column">
          <Form.Control 
            className="mt-4"
            placeholder="Ведите ваш e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control 
            className="mt-4"
            placeholder="Ведите ваш пароль"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row 
            className="d-flex justify-content-between mt-3"
            style={{paddingRight: '12px', paddingLeft: '12px'}}
          >
            <Button
              variant="outline-success"
              onClick={click}
            >
              {isLoginPage ? 'Войти' : 'Зарегистрироваться'}
            </Button>
            {isLoginPage ?
              <div style={{width: '50%'}} className="mt-2">
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
              </div>
              :
              <div style={{width: '50%'}} className="mt-2">
                Уже зарегистрированы? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </div>
            }
          </Row>
        </Form>
      </Card>
    </Container>
  );
})
 
export default Auth;