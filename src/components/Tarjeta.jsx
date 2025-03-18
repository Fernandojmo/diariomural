import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ListGroup, Form } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import dayjs from 'dayjs';
import Modal from "react-bootstrap/Modal";

const Tarjeta = ({ menu }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [menuOrdenado, setMenuOrdenado] = useState([]);
  const [ordenFecha, setOrdenFecha] = useState('asc');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  // Ordenar el menú cuando cambia `menu` o `ordenFecha`
  useEffect(() => {
    if (menu.length > 0) {
      const menuOrdenadoInicial = [...menu].sort((a, b) => {
        const fechaA = a.fechaHoraActividad.toMillis();
        const fechaB = b.fechaHoraActividad.toMillis();
        return ordenFecha === 'asc' ? fechaA - fechaB : fechaB - fechaA;
      });

      setMenuOrdenado(menuOrdenadoInicial);
    }
  }, [menu, ordenFecha]);

  const toggleOrdenFecha = () => {
    setOrdenFecha(prevOrden => (prevOrden === 'asc' ? 'desc' : 'asc'));
  };

  const handleSelectEvent = (plato) => {
    setSelectedEvent(plato);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleFiltrarPorCategoria = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const elimCategoria = () => {
    setCategoriaSeleccionada('');
  };

  // Aplicamos tanto el filtro de categoría como el orden
  const menuOrdenadoFiltrado = menuOrdenado.filter(plato => 
    categoriaSeleccionada ? plato.categoria === categoriaSeleccionada : true
  );

  // Obtener categorías únicas para el selector
  const categoriasUnicas = [...new Set(menu.map(plato => plato.categoria))];

  return (
    <div>
      <div id="menu-display" className='bg-info'>
        <Row>
          <Col xs={12} sm={12} md={12} lg={2}>
            <div id="filtros" className='m-2 bg-light rounded p-3'>
              <h4>Filtra Aquí</h4>
              <ListGroup>
                {/* Dropdown para filtrar por categoría */}
                <Form.Select
                  className="mb-2"
                  onChange={handleFiltrarPorCategoria}
                  value={categoriaSeleccionada}
                >
                  <option value="">Todas las categorías</option>
                  {categoriasUnicas.map((categoria, index) => (
                    <option key={index} value={categoria}>{categoria}</option>
                  ))}
                </Form.Select>

                <Button variant="info" className="m-1" onClick={toggleOrdenFecha}>
                  {ordenFecha === 'asc' ? '⬆️' : '⬇️'}
                </Button>
              </ListGroup>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={10}>
            <div id="contenedorcartas" className='m-2 p-2 bg-info rounded'>
              <Row className="g-4 justify-content-center">
                {menuOrdenadoFiltrado.map(plato => (
                  <Col className="d-flex" key={plato.id}>
                    <Card className="text-center fixed-card" style={{ width: '350px', height: '640px', overflow: 'hidden' }}>
                      <CardHeader>
                        <Card.Subtitle>
                          {dayjs(plato.fechaHoraActividad.toDate()).locale("es").format('dddd D MMM YYYY').toUpperCase()} / {dayjs(plato.fechaHoraActividad.toDate()).format('H:mm A')}
                        </Card.Subtitle>
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

      {/* Modal de detalles */}
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
              <p><strong>Valor:</strong> {selectedEvent.precio == 0 ? "Gratis" : selectedEvent.precio == -1 ? "Consultar" : `$${selectedEvent.precio}`}</p>
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
