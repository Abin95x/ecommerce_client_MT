import UserRoute from './routes/UserRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<UserRoute />} />
      </Routes>
      <ToastContainer autoClose={1500} />
    </BrowserRouter>
  )
}

export default App
