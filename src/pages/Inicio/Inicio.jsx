import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Ratio from 'react-bootstrap/Ratio';

const Inicio = () => {

    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

  return (
    <div>
      <div className='mb-2'>
        <Ratio className="container" key={'16x9'} aspectRatio={'16x9'}>
          <div>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              
              <Carousel.Item>
                <img
                  className="d-block w-100 vh-25"
                  src={require('./../../images/ratioimg.png')}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 vh-25"
                  src={require('./../../images/fotopompeii.png')}
                  alt="Second slide"
                  
                />
              </Carousel.Item>
              {/* <Carousel.Item>
                <img
                  className="d-block w-100 vh-25"
                  src={require('./../../images/degustacion1.jpg')}
                  alt="Third slide"
                />
              </Carousel.Item> */}
              
            </Carousel>
          </div>
        </Ratio>
        
      </div>
      <div className='container'>
        <Row className='row d-flex justify-content-center align-items-center'>
          <Col md={12} lg={6}  >
            <Ratio key={'1x1'} aspectRatio={'1x1'}>
              <Image
              className="w-100 p-4 m-2"
              src={require('./../../images/salud.jpg')}
              alt="First slide"
              />
            </Ratio>
          </Col>
          <Col md={12} lg={6} className=''>
            <h2 className='text-center m-2 p-2'>
            Descripción general del diario mural.
            </h2>

            <p className='text-center m-2 p-2'>
              En un mar de personas con banderas en mano, cada uno pretende visibilizar la propia levantándola por sobre las demás, sin mucho éxito debido a que se pierden en la masa.
              Esta metáfora, refleja el problema de dispersión de la agenda de actividades en la provincia, debido a su publicación independiente a través de redes sociales y donde el algoritmo no logra entregar una cartelera total y congruente al público general.
              Algo que hemos observando en nuestra gente que manifiesta no estar enterada de las actividades que se realizan en sus localidades.
              DMC pretende dar una solución focalizada a nivel provincial, aunando y visibilizando una cartelera unificada de actividades para la provincia.
              Así, queremos aportar a los gestores de actividades, a la identidad cultural, a una provincia más activa y mejor conectada.
            </p>
          </Col>
        </Row>
      </div>
      <div className='container'>
        <Row className='row d-flex justify-content-center align-items-center'>
          <Col md={12} lg={6}>
              <h2 className='text-center m-2 p-2'>
                Quienes somos
              </h2>
              <p className='text-center m-2 p-2'>
                Somos 3 vecinos de Curicó y nos preocupa mucho la falta de participación ciudadana en la oferta cultural local y la generación de identidad local. A nuestro parecer, algunos de los problemas a afrontar hoy son la falta de motivación en la ciudadanía y la falta de una cartelera de actividades accesible y unificada.
                Somos personas de entre 30 y 42 años, trabajamos en nuestra ciudad y nos propusimos desarrollar una solución a estas cuestiones que nos preocupan y motivan mucho. Poseemos las ideas y las habilidades necesarias para dar luz a este proyecto.
              </p>
            </Col>
            <Col md={12} lg={6}>
              <Ratio key={'1x1'} aspectRatio={'1x1'}>
                <Image
                className="w-100 p-4 m-2"
                src={require('./../../images/terraza.jpg')}
                alt="First slide"
                />
              </Ratio>
            </Col>
        </Row>
            <Row >
              <Col>
                <h1 className='text-center m-2 p-2'>Auspiciado por</h1>
              </Col>
            </Row>
            <Row xs={2} sm={2} md={2} lg={4} xl={4} xxl={4}>
              <Col >
                <Image
                  className="w-100 p-4"
                  src={require('./../../images/pompeii.png')}
                  alt="First slide"
                />
              </Col>
              <Col >
                <Image
                  className="w-100 p-4"
                  src={require('./../../images/nagata.png')}
                  alt="First slide"
                />
              </Col>
              <Col>
                <Image
                  className="w-100 p-4"
                  src={require('./../../images/maca.png')}
                  alt="First slide"
                />
              </Col>
              <Col>
                <Image
                  className="w-100 p-4"
                  src={require('./../../images/corpo.png')}
                  alt="First slide"
                />
              </Col>
            </Row>
      </div>
    </div>

  )
}

export default Inicio