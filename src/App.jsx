import './App.css'
import RegisterFormPage from './pages/RegisterFormPage'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import LoginFormPage from './pages/LoginFormPage.jsx'
import AddHotelPage from './pages/AddHotelPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import EditHotelPage from './pages/EditHotelPage.jsx'
import ListeHotelPage from './pages/ListeHotelPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
function App() {
  return(
   
    
<BrowserRouter>
<Routes>


<Route path="/register" element={<RegisterFormPage></RegisterFormPage>}></Route>
<Route path="/" element={<LoginFormPage></LoginFormPage>}></Route>
<Route path="/forgot-password" element={<ForgotPasswordPage></ForgotPasswordPage>}></Route>
<Route path="/hotels" element={<AddHotelPage></AddHotelPage>}></Route>
<Route path="/edit-hotel/:id" element={<EditHotelPage></EditHotelPage>}></Route>
<Route path='/liste-hotel' element={<ListeHotelPage></ListeHotelPage>}></Route>
<Route path='/dashboard' element={<DashboardPage></DashboardPage>}></Route>

<Route path="/reset-password" element={<ResetPasswordPage />} />

</Routes>
</BrowserRouter>
    
    
  )
}

export default App
