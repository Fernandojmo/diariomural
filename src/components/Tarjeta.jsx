import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Ratio from 'react-bootstrap/Ratio';
// import dayjs from 'dayjs';
import { ListGroup} from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
// import Cartadisp from '../pages/Menu/Cartadisp'

const Tarjeta = ({menu , setMenu}) => {

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(true);
  
  // Función para manejar el filtro por categoría
  const filtrarPorCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };
  const elimCategoria = () => {
    setCategoriaSeleccionada();
  };

  // Filtramos el menú según la categoría seleccionada
  const menuFiltrado = categoriaSeleccionada
    ? menu.filter((plato) => plato.categoria === categoriaSeleccionada)
    : menu;

  return (
    <div>
        <div id="menu-display">
          <Row>
            <Col xs={12} sm={3} md={2}>
              <div id="filtros" className='m-2 bg-light border border-info rounded p-3'>
                <h4 >Filtra Aqui</h4>
                <ListGroup>
                {!mostrarFiltros && (
                  menu.map(plato=>(
                    <ListGroup.Item onClick={() => filtrarPorCategoria(plato.categoria)} action variant="info" key={plato.id}>
                      <Button variant=''>{plato.categoria}</Button>
                    </ListGroup.Item>
                  ))
                )}
                <Button action variant="dark" className="m-1" onClick={() => elimCategoria()}> Eliminar Filtro</Button>
                <Button action variant="dark" className="m-1" onClick={() => setMostrarFiltros(!mostrarFiltros)}> Reducir / Mostrar Filtros</Button>
                  <Button
                  variant="link"
                  onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#007bff' }}
                ></Button>
              </ListGroup>
              </div>
            </Col>
            <Col xs={12} sm={9} md={10}>
              <div id="contenedorcartas" className='m-2 p-2 border border-info rounded'>
                <Row xs={1} sm={1} md={1} lg={2} xl={2} xxl={3} className="g-4">
                  {menuFiltrado.map(plato=> (
                    <Col className="d-flex" key={plato.id}>
                      <Card className="border-info text-center flex-fill">
                          <Card.Header><Card.Subtitle>Organiza: {plato.organiza}</Card.Subtitle></Card.Header>
                          <Ratio key={'21x9'} aspectRatio={'21x9'}>
                            <div><Card.Img variant="top" src={plato.image} style={{ height: '150px', objectFit: 'cover' }} /></div>
                          </Ratio>
                          <Card.Body>
                            <Card.Text className='text-info'>{plato.categoria}</Card.Text>
                            <Card.Title>{plato.nombre}</Card.Title>
                            <Card.Text>{plato.precio == 0 ? "Gratis" : `$${plato.precio}`}</Card.Text>
                            <Card.Text>En {plato.direccion}</Card.Text>
                            <Button variant="info">Ver detalles</Button>
                          </Card.Body>
                          <Card.Footer className="text-muted"><Card.Text>El {plato.fecha} A las {plato.hora}</Card.Text></Card.Footer>
                      </Card>
                    </Col>
                    ))}
                </Row>
              </div>
            </Col>
          </Row>
        </div>

        
      </div>
  )
}

export default Tarjeta




