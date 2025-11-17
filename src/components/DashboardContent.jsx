import { useEffect, useState } from "react";

export default function DashboardContent() {
  const [totalHotels, setTotalHotels] = useState(0);

  useEffect(() => {
    fetch("https://projethotel-production.up.railway.app/api/hotels")
      .then(res => res.json())
      .then(data => {
        console.log("Réponse API =", data); // <-- pour vérifier

        // ici, data EST déjà un tableau
        setTotalHotels(data.length);
      })
      .catch(err => {
        console.error("Erreur :", err);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-6 ">
      <div className="card bg-base-100 w-80 shadow-md bg-green-400">
        <div className="card-body">
          <h2 className="card-title text-lg font-bold">Hôtels ajoutés</h2>

          <p className="text-4xl font-extrabold text-primary">
            {totalHotels}
          </p>

          <p className="text-sm opacity-70">
            Total des hôtels enregistrés sur la plateforme
          </p>
        </div>

       
      </div>
    </div>
  );
}
