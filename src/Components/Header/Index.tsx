import './stylesHeader.css';
import { Button } from '@material-ui/core';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Header(){

    const navigate = useNavigate();

    const signOut = () => {
        Cookies.remove('authToken'); 
        navigate('/'); 
    };

    return(
        <header>
            <div className='containerHeader'>
                <h1 className='welcome'>Controle de Pedidos</h1>
                <Button type="submit" onClick={signOut} className="send"><h1 className='buttonText'>Sair</h1></Button>
            </div>
        </header>
    )
}
