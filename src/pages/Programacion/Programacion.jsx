import React from 'react'
import { db } from '../../config/Firebase';
import { collection, getDocs} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import Calendario from '../../components/Calendario';


export const Programacion = () => {
    const [eventos, setEventos] = useState([])

    const convertirActividadesACalendario = (actividades) => {
        return actividades.map((actividad) => {
          const fechaHoraInicio = new Date(actividad.fechaHoraActividad.seconds * 1000); // Convertir el timestamp a Date
          const fechaHoraFin = new Date(actividad.fechaHoraFinActividad.seconds * 1000); 
      
          return {
            title: actividad.nombre, // Nombre del evento
            start: fechaHoraInicio, // Fecha y hora de inicio
            end: fechaHoraFin, // Fecha y hora de fin
            description: actividad.descripcion, // Descripción del evento (opcional)
            address: actividad.direccion,
            link: actividad.link,
            image: actividad.image,
          };
        });
      };

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
        const approvedItems = docs.filter((item) => {
          const now = new Date(); // Fecha actual
          const fechaFin = new Date(item.fechaHoraFinActividad.seconds * 1000); // Convierte el timestamp de Firestore a Date
          return item.aprovado === 1 && fechaFin >= now;
        });
        const convertedItems = convertirActividadesACalendario(approvedItems);
        setEventos(convertedItems);
        
        }catch(error){
            console.log(error)

        }
    }
    getCard()
    },[])

  return (
    <div>
        <Calendario eventos={eventos}/>
    </div>
  )
}
export default Programacion;
