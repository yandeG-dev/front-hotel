import { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function ForgotPassword() {
    const [email, setEmail] = useState('');
   
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
    const reponse=await fetch("https://projethotel-production.up.railway.app/api/auth/forgot-password",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({email})
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
  <legend className="fieldset-legend">Reinitialisation de mot de passe</legend>
  <h4>Mot de passe oublié ?</h4>
<p>Entrez votre adresse e-mail ci-dessous et nous vous envoyons des instructions sur la façon de modifier votre mot de passe.</p>
  <label className="label">Email</label>
  <input type="email" value={email} className="input" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>

 
  <button className="btn btn-neutral mt-4" type="submit">Envoyer</button>
</fieldset>
</form>
    )
}