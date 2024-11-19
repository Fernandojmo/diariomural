import { useState, useEffect } from 'react';
import { db } from '../../config/Firebase';
import { collection, getDocs} from 'firebase/firestore';
import Tarjeta from  '../../components/Tarjeta'
import Modal from 'react-bootstrap/Modal';

// import Card from '../../components/card'

const Cartadisp = () => {
    const [show, setShow] = useState(true);
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
            const approvedItems = docs.filter((item)=> item.aprovado===1);
            setMenu(approvedItems);
            }catch(error){
                console.log(error)
    
            }
        }
        getCard()
        },[])
        // console.log(menu);
    return (
        <div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Custom Modal Styling
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>
                    Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                    commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                    ipsam atque a dolores quisquam quisquam adipisci possimus
                    laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                    accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                    reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                    deleniti rem!
                </p>
                </Modal.Body>
            </Modal>

            <Tarjeta menu={menu} setMenu={setMenu}/> 
        </div>
    )
}
  export default Cartadisp