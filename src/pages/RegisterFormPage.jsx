import RegisterForm from "../components/RegisterForm.jsx";

export default function RegisterFormPage() {
    return(
        <div className="justify-center items-center flex h-screen">
            <div className="flex flex-col">
 <RegisterForm></RegisterForm>
            <p>Vous avez déjà un compte? <a href="/" className="text-yellow-500 " >Se connecter</a></p>
            </div>
           
        </div>
    )
}