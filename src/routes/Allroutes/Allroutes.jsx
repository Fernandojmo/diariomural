import { Routes , Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Contactanos from '../../pages/Contactanos/Contactanos';
import Inicio from '../../pages/Inicio/Inicio';
import Nosotros from '../../pages/Nosotros/Nosotros';
import Reservas from '../../pages/Reservas/Reservas';
import Cartadisp from '../../pages/Menu/Cartadisp';
import Revisar from '../../pages/Revisar/Revisar'
const Allroutes = () => {
  return (
    <Routes>
        <Route path='/' element = {<Layout/>}>
            <Route path='/' element = {<Inicio/>}/>
            <Route path='/reservas' element = {<Reservas/>}/>
            <Route path='/nosotros' element = {<Nosotros/>}/>
            <Route path='/contactanos' element = {<Contactanos/>}/>
            <Route path='/cartadisp' element = {<Cartadisp/>}/>
            <Route path='/revisar' element = {<Revisar/>}/>
        </Route>
    </Routes>
  )
}

export default Allroutes