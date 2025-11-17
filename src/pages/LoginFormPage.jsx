import LoginForm from "../components/LoginForm.jsx";
export default function LoginFormPage() {
  return (
    <div>
        <div className="flex justify-end">
             <button className="btn bg-black p-4 mt-1.5 mr-1 " >
        <a href="register" className="text-white">
          S'inscrire
        </a>
      </button>
        </div>
  <div className="justify-center items-center flex h-screen">
     
      <div className="flex flex-col">
        <LoginForm></LoginForm>
        <p>
          Mot de passe oublié?{" "}
          <a href="forgot-password" className="text-yellow-500">
            J'ai oublié mon mot de passe
          </a>
        </p>
      </div>
    </div>
    </div>
  
  );
}
