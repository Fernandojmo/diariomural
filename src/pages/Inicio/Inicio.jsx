import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Inicio.css';

const Inicio = () => {

    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

  return (
    <div>
      <div>
        <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block vh-25"
            src={require('./../../images/Carrusel1.jpg')}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block mh-25"
            src={require('./../../images/Carrusel2.jpg')}
            alt="Second slide"
            
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block mh-25"
            src={require('./../../images/Carrusel3.jpg')}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      </div>
      <div className='cartelera'>
        <div className='cartelera--titulo'>
          <h2>CARTELERA</h2>
        </div>
        <div className='cartelera--espacio'>
        </div>
      </div>
      <div className='container'>
        <Row className='row'>
          <Col md={12} lg={6}>
            <Image
            className="w-100 p-4 m-2"
            src={require('./../../images/salud.jpg')}
            alt="First slide"
            />
          </Col>
          <Col md={12} lg={6}>
            <h2 className='text-center m-2 p-2'>
              Objetivo
            </h2>
            <p className='text-center m-2 p-2'>
              Nuestra misión es ofrecer a nuestros clientes una experiencia única a través de la elaboración de cervezas de alta calidad, utilizando ingredientes naturales y procesos artesanales que respetan la tradición cervecera. Queremos ser reconocidos como una marca que promueve el consumo responsable de alcohol y que contribuye al desarrollo sostenible de las comunidades en las que operamos.
              Queremos convertirnos en la marca líder en la industria cervecera, reconocida por su excelencia en la elaboración de cervezas y su compromiso con la calidad, la innovación y el cuidado del medio ambiente. Nos esforzamos por ofrecer una amplia variedad de cervezas que satisfagan los gustos y preferencias de nuestros clientes, mientras mantenemos nuestro compromiso con la sostenibilidad y la responsabilidad social.
            </p>
          </Col>
        </Row>
      </div>
      <div className='container'>
        <Row className='row'>
          <Col md={12} lg={6}>
              <h2 className='text-center m-2 p-2'>
                Nuestra Historia
              </h2>
              <p className='text-center m-2 p-2'>
              La bodega cervecera fue fundada en 1990 por un grupo de amigos que compartían la pasión por la cerveza artesanal. Al principio, elaboraban cervezas en pequeñas cantidades en el garaje de uno de ellos y las vendían en eventos locales. Con el tiempo, la popularidad de su cerveza aumentó y decidieron invertir en una fábrica. Hoy en día, La bodega cervecera es una empresa líder en la industria cervecera con una amplia variedad de cervezas que se venden en todo el mundo. A pesar de su éxito, la empresa mantiene su compromiso con la elaboración de cervezas de alta calidad y sigue siendo propiedad de sus fundadores originales.
              </p>
            </Col>
            <Col md={12} lg={6}>
              <Image
              className="w-100 p-4 m-2"
              src={require('./../../images/terraza.jpg')}
              alt="First slide"
              />
            </Col>
        </Row>
      </div>
      {/* <head>
  <title>Diario Mural Curicó</title>
  <style>
   
  </style>
</head>
<body>
  <header>
    <h1>Diario Mural Curicó</h1>
    <h2>Cartelera</h2>
  </header>
  <div class="container">
    <div class="card">
  
      <h2>Sáb 2 Dic.</h2>
      <p><strong>Categoría:</strong> Nombre Actividad</p>
      <p><strong>Organiza:</strong> Nombre del organizador</p>
      <div class="location">
        <i class="fas fa-map-marker-alt"></i>
        <p>Villota 78 A, Curicó</p>
      </div>
    </div>
    <div class="card">
      <h2>Sáb 2 Dic.</h2>
      <p><strong>Categoría:</strong> Nombre Actividad</p>
      <p><strong>Organiza:</strong> Nombre del organizador</p>
      <div class="location">
        <i class="fas fa-map-marker-alt"></i>
        <p>Villota 78 A, Curicó</p>
      </div>
    </div>
    <div class="card">
      <h2>Sáb 2 Dic.</h2>
      <p><strong>Categoría:</strong> Nombre Actividad</p>
      <p><strong>Organiza:</strong> Nombre del organizador</p>
      <div class="location">
        <i class="fas fa-map-marker-alt"></i>
        <p>Villota 78 A, Curicó</p>
      </div>
    </div>
  </div>
</body> */}
    </div>

  )
}

export default Inicio