import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Tarjetareserva = ({reservas , setReserva}) => {
    console.log(reservas);
  return (
    <div>
        <div id="menu-displayres">
            <div id="contenedorres" className='m-2'>
            <Row xs={1} sm={2} md={3}  lg={4} xl={5} xxl={6} className="g-4">
            {reservas.map(reserva=> (
                
                <Col key={reserva.id}>
                <Card className="text-center p-2" style={{ height: '30rem',width: '11rem', margin:'auto', text:'center'}}>
                <Card.Img variant="top" width='250rem' src={require('./../images/salud.jpg')} />
                <Card.Body>
                    <Card.Title>Reserva de: {reserva.nombre}</Card.Title>
                    <Card.Text>Mesa N°: {reserva.mesa}</Card.Text>
                    <Card.Text>Dia: {reserva.fecha}</Card.Text>
                    <Card.Text> Hora: {reserva.hora}</Card.Text>
                    <Button variant="primary">Cancelar reserva</Button>
                </Card.Body>
                </Card>
                </Col>
                ))}
            </Row>
            </div>
        </div>
    </div>
  )
}
//formatos para fecha y hora de firebase
// .toDate().toLocaleDateString() 
// .toDate().toLocaleTimeString()
export default Tarjetareserva




