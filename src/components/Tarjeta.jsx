import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ListGroup } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import dayjs from 'dayjs';
import Modal from "react-bootstrap/Modal";

const Tarjeta = ({ menu }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(true);
  const [ordenFecha, setOrdenFecha] = useState('asc');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Función para abrir modal
  const handleSelectEvent = (plato) => {
    setSelectedEvent(plato);
    setShowModal(true);
  };

  // Función para cerrar modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Controla el scroll del body
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);
  //filtra segun categorias existentes
  const filtrarPorCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };
  //Elimina filtro
  const elimCategoria = () => {
    setCategoriaSeleccionada(null);
  };

  const menuFiltrado = categoriaSeleccionada
    ? menu.filter((plato) => plato.categoria === categoriaSeleccionada)
    : menu;

  const menuOrdenado = [...menuFiltrado].sort((a, b) => {
    const fechaA = a.fechaHoraActividad.toMillis();
    const fechaB = b.fechaHoraActividad.toMillis();
    return ordenFecha === 'asc' ? fechaA - fechaB : fechaB - fechaA;
  });

  const categoriasUnicas = menu.reduce((acc, item) => {
    if (!acc.find(obj => obj.categoria === item.categoria)) {
      acc.push(item);
    }
    return acc;
  }, []);

  return (
    <div>
      <div id="menu-display" className='bg-info'>
        <Row>
          <Col xs={12} lg={2}>
            <div id="filtros" className='m-2 bg-light rounded p-3'>
              <h4>Filtra Aquí</h4>
              <ListGroup>
                {!mostrarFiltros &&
                  categoriasUnicas.map(plato => (
                    <ListGroup.Item
                      onClick={() => filtrarPorCategoria(plato.categoria)}
                      variant="info"
                      key={plato.categoria}
                    >
                      <Button variant=''>{plato.categoria}</Button>
                    </ListGroup.Item>
                  ))
                }
                <Button variant="dark" className="m-1" onClick={() => setMostrarFiltros(!mostrarFiltros)}>Ver / Ocultar Filtros</Button>
                <Button variant="dark" className="m-1" onClick={elimCategoria}>Borrar Filtro</Button>
                <Button variant="info" className="m-1" onClick={() => setOrdenFecha(ordenFecha === 'asc' ? 'desc' : 'asc')}>Ordenar por fecha</Button>
              </ListGroup>
            </div>
          </Col>
          <Col xs={12} lg={10}>
            <div id="contenedorcartas" className='m-2 p-2 bg-info rounded'>
              <Row className="g-4 justify-content-center">
                {menuOrdenado.map(plato => (
                  <Col className="d-flex" key={plato.fecha}>
                    <Card className="text-center fixed-card" style={{ width: '350px', height: '640px', overflow: 'hidden' }}>
                      <CardHeader>
                        <Card.Subtitle>{dayjs(plato.fechaHoraActividad.toDate()).locale("es").format('dddd D MMM YYYY').toUpperCase()} / {dayjs(plato.fechaHoraActividad.toDate()).format('H:mm A')}</Card.Subtitle>
                      </CardHeader>
                      <Card.Img className="" variant="top" src={plato.image} style={{ height: '400px', objectFit: 'cover' }} />
                      <Card.Body>
                        <Card.Title className='mt-2'>{plato.nombre.toUpperCase()}</Card.Title>
                        <Card.Text>{plato.direccion}</Card.Text>
                        <Button variant="info" onClick={() => handleSelectEvent(plato)}>Ver detalles</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <img src={selectedEvent.image} style={{ width: "100%", marginBottom: "15px", borderRadius: "5px" }} alt="Imagen del evento" />
              <p><strong>Título:</strong> {selectedEvent.nombre}</p>
              <p><strong>Fecha:</strong> {dayjs(selectedEvent.fechaHoraActividad.toDate()).locale("es").format('dddd D MMM').toUpperCase()} / {dayjs(selectedEvent.fechaHoraActividad.toDate()).format('H:mm A')}</p>
              <p><strong>Fecha término:</strong> {dayjs(selectedEvent.fechaHoraFinActividad.toDate()).locale("es").format('dddd D MMM').toUpperCase()} / {dayjs(selectedEvent.fechaHoraFinActividad.toDate()).format('H:mm A')}</p>
              <p>{selectedEvent.descripcion || "Sin descripción"}</p>
              <p><strong>Edad Mínima:</strong> {selectedEvent.edad || "No especificada"}</p>
              <p><strong>Ubicación:</strong> {selectedEvent.direccion || "No especificada"}</p>
              <p><strong>Valor:</strong> {selectedEvent.precio === 0 ? "Gratis" : selectedEvent.precio === -1 ? "Consultar" : `$${selectedEvent.precio}`}</p>
              <p><strong>Organiza:</strong> {selectedEvent.organiza}</p>
              <Button variant="link" href={selectedEvent.link}><strong>Redes Click Aquí</strong></Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tarjeta;






