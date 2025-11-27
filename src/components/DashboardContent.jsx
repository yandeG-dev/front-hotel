import { useEffect, useState } from "react";

export default function DashboardContent() {
  const [totalHotels, setTotalHotels] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      console.error("Pas de token, utilisateur non connecté");
      return;
    }

    fetch("https://projethotel-1.onrender.com/api/hotels", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("Réponse API =", data); 

        if (Array.isArray(data)) {
          setTotalHotels(data.length);
        } else {
          console.error("Erreur API :", data.message || data);
        }
      })
      .catch(err => {
        console.error("Erreur :", err);
      });
  }, []);

  return (
    <div className="justify-center items-center p-10">
      <div className="card bg-base-100 w-80 shadow-md ">
        <div className="card-body">
          <h2 className="card-title text-lg font-bold">Hôtels ajoutés</h2>
          <p className="text-4xl font-extrabold text-primary">{totalHotels}</p>
          <p className="text-sm opacity-70">
            Total des hôtels enregistrés sur la plateforme
          </p>
        </div>
      </div>
    </div>
  );
}
