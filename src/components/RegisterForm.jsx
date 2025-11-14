 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 export default function RegisterForm() {   
 const [nom, setNom] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [password_confirmation, setPassword_confirmation] = useState('');
const navigate=useNavigate();
const  handleSubmit=async (e)=>{
  e.preventDefault();
  if(nom.trim()==='' || email.trim()==='' || password.trim()==='' || password_confirmation.trim()===''  ){
      alert("Veuillez remplir tous les champs");
      return;
    }
  if(password.length<8){
      alert("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    if(password!==password_confirmation){
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    if(!email.includes('@')){
      alert("Veuillez entrer une adresse email valide");
      return;
    }
   
  try{
    const reponse=await fetch("https://projethotel-production.up.railway.app/api/auth/register",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({nom,email,password,password_confirmation})
    });
    
    
    const data=await reponse.json();
    console.log(data);
     if(reponse.ok){
      alert("Inscription réussie !");
      navigate("/login");
    }
  }  catch(error){
    console.error("Erreur: ",error)
      }
  }


 return(
  <form action="" onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" >
  <legend className="fieldset-legend">MedProduct</legend>
  <label className="label">Nom</label>
  <input type="text" value={nom} className="input" placeholder="Nom" onChange={(e)=>setNom(e.target.value)}/>

  <label className="label">Email</label>
  <input type="email" value={email} className="input" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>

  <label className="label">Mot de passe</label>
  <input type="password" value={password} className="input" placeholder="Mot de passe" onChange={(e)=>setPassword(e.target.value)}/>

   <label className="label">Confirmer le mot de passe</label>
  <input value={password_confirmation}  className="input" type="password" placeholder="Confirmer le mot de passe" onChange={(e)=>setPassword_confirmation(e.target.value)} />


  <button name="button" className="btn btn-neutral mt-4" type="submit">S'inscrire</button>
</fieldset>
</form>
 )
}