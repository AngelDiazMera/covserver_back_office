import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { deleteToken } from '../../providers/authHelpers';

interface Props {
    onLogOut: Function
}

function LogOutButton(props: Props) {
    const history = useHistory();
    // State variables
    const [loading, setLoading] = useState(false); // To check if it is doing the request
    
    // Hook: When the user clicks the register button
    useEffect(() => {
        if (!loading) return;

        deleteToken();
        props.onLogOut();
        history.push('/login');

        setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    const handleOnClick = () => setLoading(true);   

    return <div className="nav-item dropdown no-arrow">
        <div className="dropdown-toggle nav-link">
            <button 
                disabled = { loading }
                className="btn btn-outline-light text-secondary" 
                onClick={handleOnClick}>
                Salir
            </button>
        </div>
    </div>
}

export default LogOutButton
