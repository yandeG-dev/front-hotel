import { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
         if( email.trim()==='' || password.trim()===''  ){
      alert("Veuillez remplir tous les champs");
      return;
    }
    
        try{
    const reponse=await fetch("https://projethotel-production.up.railway.app/api/auth/login",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({email,password})
    });
    
    
    const data=await reponse.json();
    console.log(data);
     if(reponse.ok){
       localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));

      alert("Connexion réussie !");
      navigate("/dashboard");
    }else{
      alert(data.message || "Email ou mot de passe incorrect. Si vous navez pas de compte, veuillez vous inscrire.");
        return;
    }
  }  catch(error){
    console.error("Erreur: ",error)
      }
  }
    
    return (
        
    <form action="" onSubmit={handleSubmit}>
   <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input type="email" value={email} className="input" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>

  <label className="label">Password</label>
  <input type="password" value={password} className="input" placeholder="Mot de passe" onChange={(e)=>setPassword(e.target.value)}/>

  <button className="btn btn-neutral mt-4" type="submit">Se connecter</button>
</fieldset>
</form>

    )
}