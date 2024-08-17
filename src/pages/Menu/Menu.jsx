import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useState, useEffect } from 'react';
import { db } from '../../config/Firebase';
import { collection, getDocs} from 'firebase/firestore'

const Menu = () => {

  const [menu, setMenu]=useState([])

  useEffect (()=>{
    const getCard = async() => {
      try{
        const collectionRef= collection(db, 'menu')
        const response = await getDocs(collectionRef)

        const docs = response.docs.map((doc)=>{
          const data=doc.data() //firestore guarda la info de cada documento en data()
          data.id=doc.id
          return data
        })
        setMenu(docs);
      }catch(error){
          console.log(error)

      }
    }


    getCard()
  },[])
  console.log(menu);

  return (

    <div>
        <style type="text/css">
        {`
          #contenedorcartas{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 0.5rem;
            justify-content: center;
            background-color: blue;
            max-width:80%;
          }
          #menu-display{
            display: flex;
            flex-direction: row;
            background-color: red;
          }
          #filtros{
            padding: 0.5rem;
            min-width: 20%; 
            background-color: yellow;
            min-width: 8rem;
          }
          #filtros>ul{
            list-style-type: none;
            margin: 0;
            padding: 0;
            
          }
          #filtros>ul>li>p{
            font-size:1rem;
            padding-left:1rem;
          }
          // @media only screen and (max-width: 370px ) {
          //   #menu-display{
          //     flex-direction: column;
          //   }
          //   #contenedorcartas{
          //     max-width:100%;
          //   }
            
          }
        `}
        </style>
      <div id="menu-display">
        <div id="filtros" className='m-2'>
          <h4>Filtra Aqui:</h4>
          <ul>
          {
            menu.map(plato=>(
              <li key={plato.id}>
                <p>{plato.categoria}</p>
              </li>
            ))
          
          }
          </ul>
        </div>
        <div id="contenedorcartas" className='m-2'>
          <Row xs={1} sm={2} md={3}  lg={4} xl={5} xxl={6} className="g-4">
          {menu.map(plato=> (
            <Col key={plato.id}>
              <Card  className="text-center" style={{ height: '33rem',width: '11rem', margin:'auto', text:'center'}}>
              <Card.Img variant="top" width='250rem' src={plato.image} />
              <Card.Body>
                <Card.Title>{plato.nombre}</Card.Title>
                <Card.Text>${plato.precio}</Card.Text>
                <Card.Text>{plato.descripcion}</Card.Text>
                <Button variant="primary">Agregar al carrito</Button>
              </Card.Body>
              </Card>
            </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Menu