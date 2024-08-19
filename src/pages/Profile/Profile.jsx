import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../redux/actions/authActions'; // Make sure to import your logout action
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Profile = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        // dispatch(logout());
    };

    const handleEdit = () => {
        // Redirect to edit profile page or open an edit modal
    };

    return (
        <>
            <Header />
            <div className="flex justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm h-80 w-full m-20">
                    <div className="flex items-center space-x-4">
                        <img
                            className="w-16 h-16 rounded-full object-cover"
                            src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                            alt={`${user.name}'s profile`}
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                            <p className="text-gray-600">{user.email}</p>
                            <div>
                            <p className="text-gray-500">{user.phone || 'Phone number not available'}</p>
                            <p className="text-gray-500">{user.address || 'Address not available'}</p>
                            <p className="text-gray-500">{user.bio || 'No bio available'}</p>
                        </div>
                        </div>
                    </div>
                    <div className="mt-16 flex justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
