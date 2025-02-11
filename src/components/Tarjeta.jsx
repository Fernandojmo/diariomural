import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Ratio from 'react-bootstrap/Ratio';
import { ListGroup } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import dayjs from 'dayjs';
import { es } from "dayjs/locale/es";
import { format} from 'date-fns';
import Modal from "react-bootstrap/Modal";
import { list, listAll } from 'firebase/storage';

const Tarjeta = ({ menu, setMenu }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(true);
  const [ordenFecha, setOrdenFecha] = useState('asc'); // Estado para el orden de fecha
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
    const handleSelectEvent = (plato) => {
      setSelectedEvent(plato);
      setShowModal(true); // Mostrar modal al seleccionar un evento
    };
  
    const handleCloseModal = () => setShowModal(false);


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
  const categoriasUnicas = menu.filter((item, index, self) =>
    index === self.findIndex((obj) => obj.categoria === item.categoria)
  );
  
  console.log(categoriasUnicas);
  return (
    <div>
      <div id="menu-display" className='bg-info'>
        <Row>
          <Col xs={12} sm={12} md={12} lg={2}>
            <div id="filtros" className='m-2 bg-light rounded p-3'>
              <h4>Filtra Aquí</h4>
              <ListGroup>
                {!mostrarFiltros && (
                  categoriasUnicas.map(plato => (
                    <ListGroup.Item
                      onClick={() => filtrarPorCategoria(plato.categoria)}
                      variant="info"
                      key={`${plato.categoria}`}
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
          <Col xs={12} sm={12} md={12} lg={10}>
            <div id="contenedorcartas" className='m-2 p-2  bg-info  rounded'>
              <Row className="g-4 justify-content-center">
                {menuOrdenado.map(plato => (
                  <Col className="d-flex" key={plato.id}>
                    <Card className=" mb-2 text-center fixed-card" style={{ width: '400px', height: '900px', overflow: 'hidden' }}>
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
                        {/* <Card.Text >{plato.descripcion}</Card.Text> */}
                        <Button variant='link'  onClick={() => handleLink(plato.link)}>Link publicación redes</Button>
                        <br></br><Button variant="info" onClick={() => handleSelectEvent(plato)}>Ver detalles</Button>
                          <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                              <Modal.Title>Detalles de la Actividad</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {selectedEvent && (
                                <div className="">
                                  <img src={selectedEvent.image} style={{ width: "100%", marginBottom: "15px", borderRadius: "5px" }}/>
                                  <p><strong>Título:</strong> {selectedEvent.nombre}</p>
                                  <p><strong>Fecha:</strong> {dayjs(selectedEvent.fechaHoraActividad.toDate()).locale("es").format('dddd D MMM').toUpperCase()} / {dayjs(selectedEvent.fechaHoraActividad.toDate()).format('H:mm A')}</p>
                                  <p><strong>Fecha término:</strong> {dayjs(selectedEvent.fechaHoraFinActividad.toDate()).locale("es").format('dddd D MMM').toUpperCase()} / {dayjs(selectedEvent.fechaHoraFinActividad.toDate()).format('H:mm A')}</p>
                                  <p>{selectedEvent.descripcion|| "Sin descripción"}</p>
                                  <p><strong>Edad Mínima:</strong> {selectedEvent.edad || "No especificada"}</p>                                  
                                  <p><strong>Ubicación:</strong> {selectedEvent.direccion || "No especificada"}</p>
                                  <p><strong>Valor:</strong> {selectedEvent.precio == 0 ? "Gratis" : selectedEvent.precio == -1 ? "Consultar" : `$${selectedEvent.precio}`}</p>
                                  <p><strong>Organza:</strong> {selectedEvent.organiza}</p>
                                  <Button variant="link" href={selectedEvent.link} ><strong>Redes Click Aquí</strong></Button>
                                </div>
                              )}
                            </Modal.Body>      
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleCloseModal}>
                                Cerrar
                              </Button>
                            </Modal.Footer>
                          </Modal>
                      </Card.Body>
                      <Card.Footer>
                        <Card.Title>{dayjs(plato.fechaHoraActividad.toDate()).locale("es").format('dddd D MMM').toUpperCase()} / {dayjs(plato.fechaHoraActividad.toDate()).format('H:mm A')}</Card.Title>
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





