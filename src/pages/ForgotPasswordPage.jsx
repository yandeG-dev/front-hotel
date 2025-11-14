import ForgotPassword from "../components/ForgotPassword.jsx";
export default function RegisterFormPage() {   
return(
      <div className="justify-center items-center flex h-screen">
        <div className="flex flex-col">
 <ForgotPassword></ForgotPassword>
 <p>Revenir à la connexion <a href="login" className="text-yellow-500">Connexion</a></p>
     </div> 
       </div> 
)
}