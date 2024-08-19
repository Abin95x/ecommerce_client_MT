import { Navigate } from 'react-router-dom';

const Public = (props) => {
    try {
        if (localStorage.getItem('usertoken')) {
            return <Navigate to='/home' />;
        } else {
            <Navigate to='/' />;
            return props.children;
        }
    } catch (error) {
        console.log(error.message);
    }
};
export default Public;