import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Veuillez entrer votre email");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://projethotel-1.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Un email de réinitialisation a été envoyé !");
      } else {
        alert(data.message || "Impossible d'envoyer l'email.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur serveur");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Réinitialisation</legend>

        <h4 className="font-bold mb-2">Mot de passe oublié ?</h4>
        <p className="text-sm mb-4">
          Entrez votre adresse e-mail et nous vous enverrons un lien.
        </p>

        <label className="label">Email</label>
        <input
          type="email"
          value={email}
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" type="submit" disabled={loading}>
          {loading ? "Envoi..." : "Envoyer"}
        </button>
      </fieldset>
    </form>
  );
}
