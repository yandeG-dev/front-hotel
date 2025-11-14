import { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
    const reponse=await fetch("https://projethotel-production.up.railway.app/api/auth/login",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({email,password})
    });
    
    
    const data=await reponse.json();
    console.log(data);
     if(reponse.ok){
      alert("Connexion réussie !");
      navigate("/dashboard");
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