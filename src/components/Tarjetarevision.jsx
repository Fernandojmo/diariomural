import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Ratio from 'react-bootstrap/Ratio';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import Form from 'react-bootstrap/Form';

const Tarjetarevision = ({ menu, handleUpdate }) => {

    // Función para manejar el cambio del switch "aprovado"
    
    const handleSwitchChange = (id, currentValue) => {
        const updatedValue = currentValue === 1 ? 0 : 1; // Alterna entre 1 y 0
        handleUpdate(id, { aprovado: updatedValue });
    };


    return (
        <div>
            <div id="menu-display">
                <Row>
                    <Col xs={12} sm={9} md={10}>
                        <div id="contenedorcartas" className='m-2 p-2 border border-info rounded'>
                            <Row xs={1} sm={1} md={1} lg={2} xl={2} xxl={3} className="g-4">
                                {menu
                                    .filter(plato => plato.aprovado === 0)  // Filtrar solo platos aprobados
                                    .map(plato => (
                                    <Col className="d-flex" key={plato.id}>
                                        <Card className="border-info text-center flex-fill">
                                            <CardHeader>
                                                <Card.Subtitle>Organiza: {plato.organiza}</Card.Subtitle>
                                            </CardHeader>
                                            <Ratio key={'21x9'} aspectRatio={'21x9'}>
                                                <Card.Img variant="top" src={plato.image} style={{ height: '150px', objectFit: 'cover' }} />
                                            </Ratio>
                                            <Card.Body>
                                                <Card.Text className='text-info'>{plato.categoria}</Card.Text>
                                                <Card.Title>{plato.nombre}</Card.Title>
                                                <Card.Text>{plato.precio === 0 ? "Gratis" : `$${plato.precio}`}</Card.Text>
                                                <Card.Text>En {plato.direccion}</Card.Text>
                                                <Button variant="success" onClick={() => handleSwitchChange(plato.id, plato.aprovado)}>Actualizar</Button>
                                                <Button variant="warning">Eliminar</Button>
                                            </Card.Body>
                                            <Card.Footer className="text-muted">
                                                <Card.Text>El {plato.fecha} A las {plato.hora}</Card.Text>
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
}

export default Tarjetarevision;
