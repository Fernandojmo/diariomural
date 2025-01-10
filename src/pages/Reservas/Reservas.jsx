import { useState, useEffect } from 'react';
import { db, storage } from '../../config/Firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Timestamp } from "firebase/firestore";

const Reservas = () => {
    const [reserva, setReserva] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensajes de error

    const valoresIniciales = {
        fecha: '',
        hora: '',
        fechaFin:'',
        horaFin:'',
        nombre: '',
        categoria: 'Artes y diseño',
        organiza: '',
        precio: '',
        image: '',
        direccion: '',
        descripcion: '',
        aprovado: 0,
        persona: '',
        telefono: '',
        correo: '',
        esPeriodica: false,
        frecuencia: '',
        fechaRepeticionFin: ''
    };

    const [user, setUser] = useState(valoresIniciales);

    useEffect(() => {
        const getReserva = async () => {
            try {
                const collectionRef = collection(db, 'menu');
                const response = await getDocs(collectionRef);

                const docs = response.docs.map((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    return data;
                });
                setReserva(docs);
            } catch (error) {
                console.log(error);
            }
        };
        getReserva();
    }, []);

    const catchInputs = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? (checked ? 1 : 0) : value;
        console.log(user)
        setUser({
            ...user,
            [name]: newValue
        });
    };

    // Función para manejar la selección del archivo de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Verificar si el archivo es menor o igual a 1 MB
            if (file.size <= 1 * 1024 * 1024) { // 1 MB en bytes
                setImageFile(file);
                setErrorMessage(''); // Limpiar mensaje de error si el tamaño es válido
            } else {
                setErrorMessage('La imagen debe tener un tamaño máximo de 1 MB.');
                setImageFile(null); // No guardar el archivo si es demasiado grande
            }
        }
    };

      //Funcion para obtener en timestamp fecha y hora inicio actividad
    const getTimestamp = () => {
      const { fecha, hora } = user;
  
      if (fecha && hora) {
          // Combina fecha y hora para crear un objeto Date
          const dateTime = new Date(`${fecha}T${hora}`);
          // Retorna el Timestamp de Firebase
          return Timestamp.fromDate(dateTime);
      }
      return null; // Si no hay valores válidos, retorna null
  };
  // Funcion para obtener en timestamp fecha y hora fin actividad
  const getEndTimestamp = () => {
    const { fechaFin, horaFin } = user;

    if (fechaFin && horaFin) {
        // Combina fecha y hora para crear un objeto Date
        const dateTimeEnd = new Date(`${fechaFin}T${horaFin}`);
        // Retorna el Timestamp de Firebase
        return Timestamp.fromDate(dateTimeEnd);
    }
    return null; // Si no hay valores válidos, retorna null
};

    const reservarMesa = async (e) => {
        e.preventDefault();
        const confirmSubmit = window.confirm("¿Estás seguro de que deseas enviar el formulario?");
        if (!confirmSubmit) return;
    
        // Verificar si la imagen es válida
        if (!imageFile || errorMessage) return;
    
        let imageUrl = '';
        if (imageFile) {
        const uniqueImageName = `images/${Date.now()}-${imageFile.name}`;
        const imageRef = ref(storage, uniqueImageName);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
        }
    
        try {
        const collectionRef2 = collection(db, 'menu');
    
        // Si es una actividad periódica, genera múltiples entradas
        if (user.esPeriodica) {
            const { fecha, hora, fechaFin, horaFin, frecuencia, fechaRepeticionFin } = user;
            
            const fechaInicio = new Date(`${fecha}T${hora}`);
            const fechaTermino = new Date(`${fechaFin}T${horaFin}`);
            const fechaFinRepeticion = new Date(fechaRepeticionFin);
            fechaFinRepeticion.setDate(fechaFinRepeticion.getDate() + 1)
            const incrementos = {
            diaria: 1,
            semanal: 7,
            mensual: 30
            };
    
            const reservas = [];
            let fechaActual = new Date(fechaInicio);
            let fechaFinalizacion= new Date(fechaTermino)

            while (fechaActual <= fechaFinRepeticion) {
            reservas.push({
                ...user,
                fechaHoraActividad: Timestamp.fromDate(fechaActual),
                fechaHoraFinActividad: Timestamp.fromDate(fechaFinalizacion),
                image: imageUrl
            });
    
            // Incrementar la fecha según la frecuencia
            fechaActual.setDate(fechaActual.getDate() + incrementos[frecuencia]);
            fechaFinalizacion.setDate(fechaFinalizacion.getDate() + incrementos[frecuencia]);
            }
    
            // Agregar todas las reservas generadas a Firebase
            const batch = reservas.map((reserva) => addDoc(collectionRef2, reserva));
            await Promise.all(batch);
        } else {
            // Si no es periódica, agregar una sola entrada
            await addDoc(collectionRef2, {
            ...user,
            fechaHoraActividad: getTimestamp(),
            fechaHoraFinActividad: getEndTimestamp(),
            image: imageUrl
            });
        }
        } catch (error) {
        console.log(error);
        }
    
        setUser({ ...valoresIniciales });
        setImageFile(null);
        await window.location.reload(true);
    };

    return (
        <div>
            <Form className='m-4 p-4' onSubmit={reservarMesa}>
              <fieldset>
                <Form.Group className="mb-3 m-2">
                <Form.Label>¿Es una actividad periódica?</Form.Label>
                    <Form.Check 
                    type="checkbox" 
                    label="Sí" 
                    onChange={(e) => setUser({ ...user, esPeriodica: e.target.checked })} 
                    checked={user.esPeriodica || false} 
                    name="esPeriodica" 
                    />

                    {user.esPeriodica && (
                    <>
                        <Form.Label>Frecuencia de la actividad</Form.Label>
                        <Form.Select 
                        onChange={catchInputs} 
                        value={user.frecuencia} 
                        required 
                        name="frecuencia" 
                        >
                        <option value="diaria">Diaria</option>
                        <option value="semanal">Semanal</option>
                        {/* <option value="mensual">Mensual</option> */}
                        </Form.Select>

                        <Form.Label>Fecha de finalización de las actividades (Día de la ultima actividad)</Form.Label>
                        <Form.Control 
                        onChange={catchInputs} 
                        value={user.fechaRepeticionFin || ''} 
                        type="date" 
                        name="fechaRepeticionFin" 
                        required 
                        />
                    </>
                    )}
                  <Form.Label>Nombre actividad</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.nombre} required name='nombre' placeholder="Nombre" />

                  <Form.Label htmlFor="disabledSelect">Categoría</Form.Label>
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

                  <Form.Label>Institución que organiza</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.organiza} required name='organiza' placeholder="Institucion que organiza" />

                  <Form.Label>Valor</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.precio} required name='precio' type="number" placeholder="Precio" />

                  <Form.Label>Fecha inicio de la actividad</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.fecha} required type="date" name="fecha" placeholder="Date" />

                  <Form.Label>Hora de inicio de la actividad</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.hora} required type="time" name="hora" placeholder="time" />

                  <Form.Label>Fecha de finalización de la Actividad o término de concurso</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.fechaFin} required type="date" name="fechaFin" placeholder="Date" />

                  <Form.Label>Hora de finalización de la actividad</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.horaFin} required type="time" name="horaFin" placeholder="time" />

                  <Form.Label>Afiche o imagen</Form.Label>
                  <Form.Control type="file" onChange={handleImageChange} required />
                  {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                  <Form.Label>Dirección de la actividad (Si es online indicar ONLINE)</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.direccion} required name='direccion' placeholder="Dirección" />

                  <Form.Label>Descripción de actividad o bases (concurso)</Form.Label>
                  <Form.Control 
                    as="textarea"
                    rows={5} // Define el número de filas visibles
                    style={{ resize: "vertical", overflowY: "scroll" }} // Permite redimensionar verticalmente y agrega scroll
                    onChange={catchInputs}
                    value={user.descripcion}
                    required
                    name="descripcion"
                    placeholder="Descripcion"
                  />

                  <Form.Label>Responsable directo </Form.Label>
                  <Form.Control onChange={catchInputs} value={user.persona} required name='persona' placeholder="Nombre de quien publica" />

                  <Form.Label>Teléfono responsable directo</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.telefono} required name='telefono' placeholder="9 12345678" />

                  <Form.Label>Correo responsable directo</Form.Label>
                  <Form.Control onChange={catchInputs} type='email' value={user.correo} required name='correo' placeholder="Correo@gmail.cl" />

                  <Form.Label>Link redes sociales</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.link} required name='link' placeholder="https://instagram.com/actividad" />

                <Form.Label htmlFor="disabledSelect">Edad mínima recomendada</Form.Label>
                <Form.Select onChange={catchInputs} value={user.edad} required name='edad' id="disabledSelect">
                    <option>0+ años</option>
                    <option>5+ años</option>
                    <option>10+ años</option>
                    <option>15+ años</option>
                    <option>18+ años</option>
                    <option>24+ años</option>
                    <option>35+ años</option>
                    <option>60+ años</option>
                    <option>Todas las edades</option>
                  </Form.Select>
                </Form.Group>
                <Button type="submit" className='m-2'>Publicar</Button>
                <br />
                <p className='d-flex justify-content-center align-items-center'>Tu publicación será revisada y aprobada en un rango entre 12 y 24 horas</p>
              </fieldset>
            </Form>
        </div>
    );
};

export default Reservas;
