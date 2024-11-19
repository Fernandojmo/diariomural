import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logoencabezado from '../../images/logoencabezado.png';
import logodmcfull from '../../images/lgdmcfull.png';
import insta from '../../images/instagram.png';
import correo from '../../images/correo.png'
import './Navigation.css';
const Navigation = () => {
  return (
    // <div>
    <div className="background-image">
      {/* Logo principal centrado */}
      <div className="d-flex justify-content-center">
        <img alt="Logo" src={logodmcfull} height="250" className="p-2 m-2" />
    </div>
    {/* </div> */}
      <Container className='m-1'>
        {/* Row para íconos de Instagram, solo visible en tamaño md en adelante */}
        <Row className="d-none d-sm-flex justify-content-end me-3">
          <Col xs="auto" className="d-flex justify-content-end">
            <a href="https://www.instagram.com/diariomuralcurico" target="_blank" rel="noopener noreferrer">
              <img alt="Instagram" src={insta} height="50" className="m-1 d-inline-block align-top" />
            </a>
            <a href="mailto:diariomuralcurico@gmail.com">
              <img alt="Correo" src={correo} height="50" className="m-1 d-inline-block align-top" />
            </a>
            {/* <img alt="Instagram" src={insta} height="50" className="m-1 d-inline-block align-top" /> */}
          </Col>
        </Row>
        <Row className="d-none d-sm-flex justify-content-end text-end">
          <Col xs="auto" >
              <Navbar key="sm" expand="sm">
                <Container fluid>
                  <Navbar.Toggle className="bg-info h1" aria-controls="offcanvasNavbar-expand-sm" />
                  <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-sm"
                    aria-labelledby="offcanvasNavbarLabel-expand-sm"
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
                        <img alt="Logo" src={logoencabezado} height="50" className="d-inline-block align-top" />
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="flex-grow-1 pe-3">
                        <Nav.Link href="/" className="text-white bg-dark border-dark rounded m-1 p-2">Actividades</Nav.Link>
                        <Nav.Link href="/publicar" className="text-white bg-dark border-dark rounded m-1 p-2">Publicar</Nav.Link>
                        <Nav.Link href="/programacion" className="text-white bg-dark border-dark rounded m-1 p-2">Calendario</Nav.Link>
                        <Nav.Link href="/quienes-somos" className="text-white bg-dark border-dark rounded m-1 p-2">Quienes somos</Nav.Link>
                      </Nav>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            </Col>
        </Row>

        {/* Row para el Navbar con botones para md hacia abajo */}
        <Row className="d-flex align-items-center d-sm-none justify-content-center text-center mt-2">
          {/* Íconos de Instagram para pantallas pequeñas (ocultos en tamaño md) */}
          <Col xs="auto" className="d-flex d-md-none align-items-center justify-content-center text-center">
          <a href="https://www.instagram.com/diariomuralcurico" target="_blank" rel="noopener noreferrer">
            <img alt="Instagram" src={insta} height="50" className="m-1 d-inline-block align-top" />
          </a>  
            <a href="mailto:diariomuralcurico@gmail.com">
              <img alt="Correo" src={correo} height="50" className="m-1 d-inline-block align-top" />
            </a>
            {/* <img alt="Instagram" src={insta} height="50" className="m-1 d-inline-block align-top" /> */}
          </Col>

          {/* Navbar con Offcanvas */}
          <Col xs="auto">
            <Navbar key="sm" expand="sm">
              <Container fluid>
                <Navbar.Toggle className="bg-info h1" aria-controls="offcanvasNavbar-expand-sm" />
                <Navbar.Offcanvas
                  id="offcanvasNavbar-expand-sm"
                  aria-labelledby="offcanvasNavbarLabel-expand-sm"
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
                      <img alt="Logo" src={logoencabezado} height="50" className="d-inline-block align-top" />
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="flex-grow-1 pe-3">

                      
                      <Nav.Link href="/" className="text-white bg-dark border-dark rounded m-1 p-2">Actividades</Nav.Link>
                      <Nav.Link href="/publicar" className="text-white bg-dark border-dark rounded m-1 p-2">Publicar</Nav.Link>
                      <Nav.Link href="/programacion" className="text-white bg-dark border-dark rounded m-1 p-2">Calendario</Nav.Link>
                      <Nav.Link href="/quienes-somos" className="text-white bg-dark border-dark rounded m-1 p-2">Quienes somos</Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          </Col>
        </Row>
        

      </Container>
    </div>
  );
};

export default Navigation;