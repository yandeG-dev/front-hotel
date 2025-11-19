import ResetPassword from "../components/ResetPassword.jsx";
export default function ForgotPasswordPage() {   
return(
      <div className="justify-center items-center flex h-screen">
        <div className="flex flex-col">
 <ResetPassword></ResetPassword>
 <p>Revenir à la connexion <a href="/" className="text-yellow-500">Connexion</a></p>
     </div> 
       </div> 
)
}