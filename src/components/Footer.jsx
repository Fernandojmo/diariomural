import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const Footer = () => {
  return (
    <div>
        <style type="text/css">
            {`
                *{
                    box-sizing: border-box;
                }
                #rrss>span>img{
                    max-height:4rem;
                    box-sizing: border-box;
                }
            `}
        </style>
        <div id='rrss' className='bg-warning d-flex flex-direction-row justify-content-center align-items-center'>
            <span className='p-2'><img className='img-fluid' src={require('../images/facebook.png')} alt="" /></span>
            <span className='p-2'><img className='img-fluid' src={require('../images/instagram.png')} alt="" /></span>
            <span className='p-2'><img className='img-fluid' src={require('../images/twitter.png')} alt="" /></span>
        </div>
        <div className='d-flex justify-content-center bg-black p-4 text-center text-white'>
            <Container>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <ul className='m-4 list-unstyled'>
                            <li>
                                <h3>LA EMPRESA</h3>
                            </li>
                            <li>
                                <p>Terminos y condiciones</p>
                            </li>
                            <li>
                                <p>Blog</p>
                            </li>
                            <li>
                                <p>Cambios y devoluciones</p>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <ul className='m-4 list-unstyled'>
                            <li>
                                <h3>SERVICIO</h3>
                            </li>
                            <li>
                                <p>Formas de pago</p>
                            </li>
                            <li>
                                <p>Compra segura</p>
                            </li>
                            <li>
                                <p>Politicas de despacho</p>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={12} md={4}>
                        <ul className='m-4 list-unstyled'>
                            <li>
                                <h3>Contacto</h3>
                            </li>
                            <li>
                                <p>Contactanos</p>
                            </li>
                            <li>
                                <p>Trabaja con nosotros</p>
                            </li>
                            <li>
                                <p>Asociados</p>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
  )
}

export default Footer