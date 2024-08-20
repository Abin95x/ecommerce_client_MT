import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate()


    const handleLogout = () => {
        localStorage.removeItem('usertoken');
        toast.info('Logged out successfully');
        navigate('/');
    };

    const handleEdit = () => {
        // Redirect to edit profile page or open an edit modal
    };

    return (
        <>
    <Header />
    <div className="flex justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full md:w-96 h-96 m-4 md:m-20">
            <div className="flex items-center space-x-4">
                <img
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                    src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                    alt={`${user.name}'s profile`}
                />
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="mt-2">
                        <p className="text-gray-500">{user.phone || 'Phone number not available'}</p>
                        <p className="text-gray-500">{user.address || 'Address not available'}</p>
                        <p className="text-gray-500">{user.bio || 'No bio available'}</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-end space-x-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 mt-28 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 mt-28 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
    <Footer />
</>

    );
}

export default Profile;
