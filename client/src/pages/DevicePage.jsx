import React from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import star from '../assets/device_star.png'

const DevicePage = () => {
  const device = {id: 1, name: 'note 13', price: 1600, rating: 0, img: 'https://ust-katav.diamondelectric.ru/images/798/797296/megafon_4g_turbo_1.jpg'}
  const description = [
    {id:1, title: 'Оперативная память', description: '5 Гб'},
    {id:2, title: 'Процессор', description: 'Snapdragon 900'},
    {id:3, title: 'Кол-во ядер', description: '2'},
    {id:4, title: 'Частота', description: '2400 Гц'},
    {id:5, title: 'Камера', description: '64 МП'},
    {id:6, title: 'Емкость аккумулятора', description: '5000'},
    {id:7, title: 'Дисплей', description: 'OLED'},
    {id:8, title: 'NFC', description: 'нет'},
    {id:9, title: 'Цвет', description: 'бели чут чут чорни'},
  ]
  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={device.img} />
        </Col>
        <Col md={4} className="d-flex flex-column align-items-center">
          <h2>{device.name}</h2>
          <div 
            className="d-flex flex-column align-items-center justify-content-center" 
            style={{width:200, height:200, background: `url(${star}) no-repeat center center`, backgroundSize: 'cover', fontSize:32}}
          >
            {device.rating}
          </div>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{width:300, height: 300, fontSize:32, border: '5px solid light'}}
          >
            <h3>От: {device.price}</h3>
            <Button variant="outline-dark">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <h2>Характеристики:</h2>
        {description.map(info => 
          <Row key={info.id} style={{backgroundColor: `${info.id % 2 === 1 ? '#f3f3f3' : '#ffffff'}`, padding: 4}}>{info.title}: {info.description}</Row>
        )}
      </Row>
    </Container>
  );
}
 
export default DevicePage;