import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Navigation = () => {
  return (
    <div>
              <>
                {['sm'].map((expand) => (
                  <Navbar key={expand} bg="info" expand={expand}>
                    <Container fluid>
                      <Navbar.Brand className='d-flex justify-content-center align-items-center' href="/">
                        {/* <img
                          alt="Logo"
                          src={logoDMC}
                          width="40"
                          height="40"
                          className="d-inline-block align-top"
                        />{' '} */}
                        DIARIO MURAL DE CURICÓ
                      </Navbar.Brand>

                      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                      <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                      >
                        <Offcanvas.Header className='bg-info h1' closeButton>
                          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            Diario Mural Curicó
                          </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                          <Nav className="justify-content-left flex-grow-1 pe-3">
                            <Nav.Link href='/inicio' className='text-white bg-dark border-dark rounded m-1 p-2'>Inicio</Nav.Link>
                            <Nav.Link href='/' className='text-white bg-dark border-dark rounded m-1 p-2'>Actividades</Nav.Link>
                            <Nav.Link href='/publicar' className='text-white bg-dark border-dark rounded m-1 p-2'>Publicar</Nav.Link>
                            {/* <Nav.Link href='/revisar' className='text-white bg-success border-dark rounded m-1 p-2'>Revisar</Nav.Link> */}
                          </Nav>
                        </Offcanvas.Body>
                      </Navbar.Offcanvas>
                    </Container>
                  </Navbar>
                ))}
              </>
    </div>
  )
}

export default Navigation