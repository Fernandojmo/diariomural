import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Navigation = () => {
  return (
    <div>
      <>
        {['sm'].map((expand) => (
          <Navbar key={expand} expand={expand}>
            <Container fluid>
              <Navbar.Brand href="/" className='h1'>Logo Mural</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end">
                  <Offcanvas.Header className='bg-white h1' closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Logo Mural
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-center flex-grow-1 pe-3">
                      <Nav.Link href='/' className='text-white boton-navigation border-dark rounded m-1 p-2'>Inicio</Nav.Link>
                      <Nav.Link href='/cartadisp' className='text-white boton-navigation border-dark rounded m-1 p-2'>Cartelera</Nav.Link>
                      <Nav.Link href='/reservas' className='text-white boton-navigation border-dark rounded m-1 p-2'>Blog</Nav.Link>
                      <Nav.Link href='/reservas' className='text-white boton-navigation border-dark rounded m-1 p-2'>Nosotros</Nav.Link>
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