import { useState, useEffect } from 'react';
import { db } from '../../config/Firebase';
import { collection, getDocs, addDoc} from 'firebase/firestore';
// import Tarjetareserva from  '../../components/Tarjetareserva'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Formulario from '../../components/Form'
// import { async } from '@firebase/util';

const Reservas = () => {
  // const refresh =()=> window.location.reload(true)
    const [reserva, setReserva] = useState([])
        useEffect (()=>{
        const getReserva = async() => {
            try{
            const collectionRef= collection(db, 'menu')
            const response = await getDocs(collectionRef)
    
            const docs = response.docs.map((doc)=>{
                const data=doc.data() //firestore guarda la info de cada documento en data()
                data.id=doc.id
                return data
            })
            setReserva(docs);
            }catch(error){
                console.log(error)
            }
        }
        getReserva()
        },[])
        console.log(reserva);

    const valoresIniciales={
        fecha:'',
        hora:'',
        nombre:'',
        categoria:'',
        organiza:'',
        precio:'',
        image:'',


    }

    const [user, setUser] = useState(valoresIniciales)
    
    const catchInputs= (e) =>{
      e.preventDefault()
      const {name,value}=e.target;
      setUser({
        ...user,
        [name]: value
      })
    }

    const reservarMesa=async(e)=>{
      e.preventDefault()
      try{
        const collectionRef2=collection(db, 'menu')
        await addDoc(collectionRef2, {
            ...user
        })
      }catch(error) {
          console.log(error)
      }
      setUser({...valoresIniciales})
      await window.location.reload(true)
    }

    return (
        <div>
            <Form className='m-4 p-4' onSubmit={reservarMesa}>
              <fieldset>
                <Form.Group className="mb-3 m-2">
                  <Form.Label >Nombre actividad</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.nombre} required name='nombre' placeholder="Nombre" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label htmlFor="disabledSelect">Categoria</Form.Label>
                  <Form.Select onChange={catchInputs} value={user.categoria} required name='categoria' id="disabledSelect">
                    <option>Artes y diseño</option>
                    <option>Eventos, Festivales y Carrete</option>
                    <option>Deportes</option>
                    <option>Gastronomía</option>
                    <option>Encuentros, Conferencias, Seminarios, Ferias, Exposiciones</option>
                    <option>Cursos, Talleres y Concursos</option>
                    <option>Musica y Danza</option>
                    <option>Teatro y Cine</option>
                    <option>Turismo</option>
                    <option>Otro</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label >Institucion que organiza</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.organiza} required name='organiza'  placeholder="Institucion que organiza" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label >Precio</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.precio} required name='precio' type="number" placeholder="Precio" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <div>
                      <div className="row">
                          <div className="col-md-4 m-2">
                              <Form.Group controlId="dob">
                                  <Form.Label>Fecha Actividad</Form.Label>
                                  <Form.Control onChange={catchInputs} value={user.fecha} required type="date" name="fecha" placeholder="Date" />
                              </Form.Group>
                          </div>
                      </div>
                  </div>
                  <div>
                      <div className="row">
                          <div className="col-md-4 m-2">
                              <Form.Group controlId="dob">
                                  <Form.Label>Hora de la reserva</Form.Label>
                                  <Form.Control onChange={catchInputs} value={user.hora} required type="time" name="hora" placeholder="time" />
                              </Form.Group>
                          </div>
                      </div>
                  </div>

                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label >Link fotografia</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.image} required name='image'  placeholder="Link fotografia" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label >Dirección</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.direccion} required name='direccion' placeholder="Dirección" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label >Descripción de Actividad</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.descripcion} required name='descripcion' placeholder="Descripcion" />
                </Form.Group>
                <Button type="submit" className='m-2'>Publicar</Button>
              </fieldset>
            </Form>
        </div>
    )
}
  export default Reservas