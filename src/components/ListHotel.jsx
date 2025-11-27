import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListHotel() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchHotels = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("https://projethotel-1.onrender.com/api/hotels",
           {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        
        const data = await res.json();
        console.log(data);
        setHotels(data);
        

      } catch (err) {
        console.error(err);
        alert("Erreur serveur");
      }
    };
    fetchHotels();
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet hôtel ?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://projethotel-1.onrender.com/api/hotels/${id}`,
        { method: "DELETE",
           headers: {
      "Authorization": `Bearer ${token}`
    }
         }
      );
      if (res.ok) setHotels(hotels.filter((h) => h.id !== id));
      else alert("Erreur lors de la suppression");
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  return (
    <div>
    <div className="flex justify-end p-6 ">
             <button className="btn bg-black p-4 mt-1.5 mr-1 " >
        <a href="hotels" className="text-white">
        + Ajouter un hôtel
        </a>
      </button>
        </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      
      {hotels.map((hotel) => (
        <div key={hotel.id} className="card w-80 bg-base-100 shadow-md">
          <figure>
            <img
              src={`https://projethotel-1.onrender.com${hotel.cheminImage}`}
              alt={hotel.nomHotel}
              className="w-full h-50 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{hotel.nomHotel}</h2>
            <p>Adresse: {hotel.addresse}</p>
            <p>Prix: {hotel.prixNuitee} {hotel.devise}</p>
            <p>Numéro: {hotel.numero}</p>
            <p>Email: {hotel.email}</p>
            <div className="card-actions justify-end mt-2">
              <button
                className="btn btn-success text-white btn-sm"
                onClick={() => navigate(`/edit-hotel/${hotel.id}`)}
              >
                Modifier
              </button>
              <button
                className="btn bg-red-600 text-white btn-sm"
                onClick={() => handleDelete(hotel.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
