import { useState, useEffect } from 'react';
import { db } from '../../config/Firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import Tarjetarevision from '../../components/Tarjetarevision';

const Revisar = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const getCard = async () => {
            try {
                const collectionRef = collection(db, 'menu');
                const response = await getDocs(collectionRef);

                const docs = response.docs.map((doc) => {
                    const data = doc.data();
                    data.id = doc.id; // Almacena el ID del documento
                    return data;
                });
                setMenu(docs);
            } catch (error) {
                console.log(error);
            }
        };
        getCard();
    }, []);

    // Función para actualizar un documento específico
    const handleUpdate = async (id, updatedData) => {
      console.log("trabajando")
        try {
            const docRef = doc(db, 'menu', id);
            await updateDoc(docRef, updatedData);
            // Actualiza el estado local después de la actualización
            setMenu((prevMenu) =>
                prevMenu.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
            );
        } catch (error) {
            console.log("Error al actualizar el documento:", error);
        }
    };

    return (
        <div>
            {/* Pasamos la función handleUpdate al componente */}
            <Tarjetarevision menu={menu} setMenu={setMenu} handleUpdate={handleUpdate} /> 
        </div>
    );
};

export default Revisar;
