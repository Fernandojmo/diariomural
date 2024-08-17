import { useState, useEffect } from 'react';
import { db } from '../../config/Firebase';
import { collection, getDocs} from 'firebase/firestore';
import Tarjeta from  '../../components/Tarjeta'

// import Card from '../../components/card'

const Cartadisp = () => {

    const [menu, setMenu] = useState([])
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
            <Tarjeta menu={menu} setMenu={setMenu}/> 
        </div>
    )
}
  export default Cartadisp