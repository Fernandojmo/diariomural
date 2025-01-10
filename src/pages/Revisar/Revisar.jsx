import { useState, useEffect } from 'react';
import { db } from '../../config/Firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Tarjetarevision from '../../components/Tarjetarevision';
import { storage } from '../../config/Firebase';
import { ref, deleteObject } from 'firebase/storage';


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
    const handleDelete = async (id) => {
        try {
            // Encuentra el elemento a eliminar para acceder a la URL de la imagen
            const itemToDelete = menu.find(plato => plato.id === id);
            const imageUrl = itemToDelete?.image;  // Asume que la URL de la imagen se guarda en el campo 'image'
            
            // Referencia al documento en Firestore
            const docRef = doc(db, 'menu', id);
            await deleteDoc(docRef);

            // Actualizar el estado local eliminando la tarjeta
            const updatedMenu = menu.filter(plato => plato.id !== id);
            setMenu(updatedMenu);
            
            // Eliminar la imagen de Firebase Storage si existe
            if (imageUrl) {
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
            }
        } catch (error) {
            console.error("Error al eliminar el documento o la imagen:", error);
        }
    };

    return (
        <div>
            {/* Pasamos la función handleUpdate al componente */}
            <Tarjetarevision menu={menu} setMenu={setMenu} handleUpdate={handleUpdate} handleDelete={handleDelete}/> 
        </div>
    );
};

export default Revisar;
