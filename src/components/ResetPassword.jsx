import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !password_confirmation) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    if (password !== password_confirmation) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch(
        "https://projethotel-production.up.railway.app/api/auth/reset-password",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email,
            token,
            password,
            password_confirmation,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Mot de passe réinitialisé !");
        navigate("/");
      } else {
        alert(data.message || "Erreur lors de la réinitialisation");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur serveur");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Nouveau mot de passe</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Nouveau mot de passe</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="label">Confirmer le mot de passe</label>
        <input
          type="password"
          className="input"
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" type="submit">
          Réinitialiser
        </button>
      </fieldset>
    </form>
  );
}
