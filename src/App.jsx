import './App.css'
import RegisterFormPage from './pages/RegisterFormPage'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import LoginFormPage from './pages/LoginFormPage.jsx'

import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
function App() {
  return(
   
    
<BrowserRouter>
<Routes>


<Route path="/register" element={<RegisterFormPage></RegisterFormPage>}></Route>
<Route path="/login" element={<LoginFormPage></LoginFormPage>}></Route>
<Route path="/forgot-password" element={<ForgotPasswordPage></ForgotPasswordPage>}></Route>

</Routes>
</BrowserRouter>
    
    
  )
}

export default App
