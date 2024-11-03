import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
// import dayjs from 'dayjs';
import { ListGroup} from 'react-bootstrap';
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
        <style type="text/css">
        {`
          // #contenedorcartas{
          //   display: flex;
          //   flex-direction: row;
          //   flex-wrap: wrap;
          //   padding: 0.5rem;
          //   justify-content: center;
          //   background-color: blue;
          //   max-width:95%;
          // }
          // #menu-display{
          //   display: flex;
          //   flex-direction: row;
          //   background-color: red;
          // }
          // #filtros{
          //   padding: 0.5rem;
          //   min-width: 20%; 
          //   background-color: yellow;
          //   min-width: 8rem;
          // }
          // #filtros>ul{
          //   list-style-type: none;
          //   margin: 0;
          //   padding: 0;
            
          // }
          // #filtros>ul>li>p{
          //   font-size:1rem;
          //   padding-left:1rem;
          // }            
          // }
        `}
        </style>

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
                <Button action variant="dark" onClick={() => elimCategoria()}> Eliminar Filtro</Button>
                <Button action variant="dark" onClick={() => setMostrarFiltros(!mostrarFiltros)}> Reducir / Mostrar Filtros</Button>
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
                          <Card.Img variant="top" src={plato.image} style={{ height: '150px', objectFit: 'cover' }} />
                          <Card.Body>
                            <Card.Text>El {plato.fecha}</Card.Text>
                            <Card.Text>A las {plato.hora}</Card.Text>
                            <Card.Text>{plato.categoria}</Card.Text>
                            <Card.Title>{plato.nombre}</Card.Title>
                            <Card.Text>{plato.organiza}</Card.Text>
                            <Card.Text>{plato.precio == 0 ? "Gratis" : `$${plato.precio}`}</Card.Text>
                            <Card.Text>{plato.direccion}</Card.Text>
                            <Button variant="primary">Ver detalles</Button>
                          </Card.Body>
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




