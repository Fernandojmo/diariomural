import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Ratio from 'react-bootstrap/Ratio';
import { ListGroup } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';

const Tarjeta = ({ menu, setMenu }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(true);
  const [ordenFecha, setOrdenFecha] = useState('asc'); // Estado para el orden de fecha

  const handleLink = (url) => {
    if (url) {
      window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
    } else {
      console.error("URL no válida");
    }
  };

  const filtrarPorCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const elimCategoria = () => {
    setCategoriaSeleccionada(null);
  };

  // Filtramos el menú según la categoría seleccionada
  const menuFiltrado = categoriaSeleccionada
    ? menu.filter((plato) => plato.categoria === categoriaSeleccionada)
    : menu;

  // Ordena las tarjetas por fecha según el valor de 'ordenFecha'
  const menuOrdenado = [...menuFiltrado].sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return ordenFecha === 'asc' ? fechaA - fechaB : fechaB - fechaA;
  });

  return (
    <div>
      <div id="menu-display" className='bg-info'>
        <Row>
          <Col xs={12} sm={3} md={2}>
            <div id="filtros" className='m-2 bg-light rounded p-3'>
              <h4>Filtra Aquí</h4>
              <ListGroup>
                {!mostrarFiltros && (
                  menu.map(plato => (
                    <ListGroup.Item
                      onClick={() => filtrarPorCategoria(plato.categoria)}
                      variant="info"
                      key={plato.id}
                    >
                      <Button variant=''>{plato.categoria}</Button>
                    </ListGroup.Item>
                  ))
                )}
                <Button variant="dark" className="m-1" onClick={() => setMostrarFiltros(!mostrarFiltros)}>Ver / Ocultar Filtros</Button>
                <Button variant="dark" className="m-1" onClick={() => elimCategoria()}>Borrar Filtro</Button>
                {/* Botón para cambiar el orden de las fechas */}
                <Button variant="info" className="m-1" onClick={() => setOrdenFecha(ordenFecha === 'asc' ? 'desc' : 'asc')}>Ordenar por fecha</Button>
              </ListGroup>
            </div>
          </Col>
          <Col xs={12} sm={9} md={10}>
            <div id="contenedorcartas" className='m-2 p-2  bg-info  rounded'>
              <Row xs={1} sm={1} md={1} lg={2} xl={2} xxl={3} className="g-4">
                {menuOrdenado.map(plato => (
                  <Col className="d-flex" key={plato.id}>
                    <Card className=" mb-2 text-center flex-fill">
                      <CardHeader>
                        <Card.Subtitle>Organiza: {plato.organiza}</Card.Subtitle>
                      </CardHeader>
                      <Ratio key={'1x1'} aspectRatio={'1x1'}>
                        <Card.Img className="p-2" variant="top" src={plato.image} style={{ height: '350px', objectFit: 'cover' }} />
                      </Ratio>
                      <Card.Body>
                        <Card.Text >{plato.categoria}</Card.Text>
                        <Card.Title >{plato.nombre.toUpperCase()}</Card.Title>
                        <Card.Text >{plato.precio == 0 ? "Gratis" : `$${plato.precio}`}</Card.Text>
                        <Card.Text >En {plato.direccion}</Card.Text>
                        <Card.Text >Edad mínima: {plato.edad}</Card.Text>
                        <Card.Text >{plato.descripcion}</Card.Text>
                        <Button variant='link'  onClick={() => handleLink(plato.link)}>Link publicación redes</Button>
                        {/* <br></br><Button variant="info">Ver detalles</Button> */}
                      </Card.Body>
                      <Card.Footer>
                        <Card.Title>EL {plato.fecha} A LAS {plato.hora}</Card.Title>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Tarjeta;





