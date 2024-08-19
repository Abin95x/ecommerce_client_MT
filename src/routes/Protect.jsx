import { Navigate } from 'react-router-dom';

function Protect(props) {
    if (localStorage.getItem('usertoken')) {
        return props.children;
    } else {
        return <Navigate to='/' />;
    }
}

export default Protect;