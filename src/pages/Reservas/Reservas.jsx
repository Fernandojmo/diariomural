import { useState, useEffect } from 'react';
import { db } from '../../config/Firebase';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import Tarjetareserva from  '../../components/Tarjetareserva'
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
            const collectionRef= collection(db, 'reservas')
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
        mesa:'',
        nombre:''

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
        const collectionRef2=collection(db, 'reservas')
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
                  <Form.Label htmlFor="disabledTextInput">Nombre de la reserva:  </Form.Label>
                  <Form.Control onChange={catchInputs} value={user.nombre} required name='nombre' id="disabledTextInput" placeholder="Nombre" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label htmlFor="disabledSelect">Mesa a reservar</Form.Label>
                  <Form.Select onChange={catchInputs} value={user.mesa} required name='mesa' id="disabledSelect">
                    <option></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <div>
                      <div className="row">
                          <div className="col-md-4 m-2">
                              <Form.Group controlId="dob">
                                  <Form.Label>Fecha a reservar</Form.Label>
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
                  <Form.Check 
                      required
                      className='m-2'
                      type="checkbox"
                      id="disabledFieldsetCheck"
                      label="Confirmar Reserva"
                  />
                </Form.Group>
                <Button type="submit" className='m-2'>Reservar</Button>
              </fieldset>
            </Form>
            <Tarjetareserva reservas={reserva} setReserva={setReserva}/> 
        </div>
    )
}
  export default Reservas