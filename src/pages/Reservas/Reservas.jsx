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
        correo: ''
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

    // const handleSubmit = () =>{
    //   const confirmSubmit = window.confirm("¿Estás seguro de que deseas enviar el formulario?");
    //   if (confirmSubmit){

    //   }
    // }
    const reservarMesa = async (e) => {
        e.preventDefault();
        const confirmSubmit = window.confirm("¿Estás seguro de que deseas enviar el formulario?");
        if (!confirmSubmit){
            return;
        }
                // Evitar envío si no hay un archivo o si hay un mensaje de error
        if (!imageFile || errorMessage) {
          return; // Salir de la función sin enviar el formulario
        }
        let imageUrl = '';

        // Subir imagen a Firebase Storage si se ha seleccionado un archivo válido
        if (imageFile) {
          // Generar un nombre de archivo único utilizando Date.now()
            const uniqueImageName = `images/${Date.now()}-${imageFile.name}`;
            const imageRef = ref(storage, uniqueImageName);
            await uploadBytes(imageRef, imageFile);
            imageUrl = await getDownloadURL(imageRef); // Obtener la URL de descarga de la imagen
        }

        try {
            const collectionRef2 = collection(db, 'menu');

            // Obtén el Timestamp desde fecha y hora
            const actividadTimestamp = getTimestamp();

            await addDoc(collectionRef2, {
                ...user,
                fechaHoraActividad: actividadTimestamp,
                image: imageUrl // Guardar la URL de la imagen en Firestore
            });
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
                  <Form.Label>Nombre actividad</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.nombre} required name='nombre' placeholder="Nombre" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
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
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label>Institución que organiza</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.organiza} required name='organiza' placeholder="Institucion que organiza" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label>Valor</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.precio} required name='precio' type="number" placeholder="Precio" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha Actividad o término de concurso</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.fecha} required type="date" name="fecha" placeholder="Date" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label>Hora de la actividad</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.hora} required type="time" name="hora" placeholder="time" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label>Afiche o imagen</Form.Label>
                  <Form.Control type="file" onChange={handleImageChange} required />
                  {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label>Dirección de la actividad (Si es online indicar ONLINE)</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.direccion} required name='direccion' placeholder="Dirección" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label>Descripción de actividad o bases (concurso)</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.descripcion} required name='descripcion' placeholder="Descripcion" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label>Responsable directo </Form.Label>
                  <Form.Control onChange={catchInputs} value={user.persona} required name='persona' placeholder="Nombre de quien publica" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label>Teléfono responsable directo</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.telefono} required name='telefono' placeholder="9 12345678" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label>Correo responsable directo</Form.Label>
                  <Form.Control onChange={catchInputs} type='email' value={user.correo} required name='correo' placeholder="Correo@gmail.cl" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
                  <Form.Label>Link redes sociales</Form.Label>
                  <Form.Control onChange={catchInputs} value={user.link} required name='link' placeholder="https://instagram.com/actividad" />
                </Form.Group>
                <Form.Group className="mb-3 m-2">
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
