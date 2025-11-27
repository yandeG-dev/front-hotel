import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditHotel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [nomHotel, setNomHotel] = useState("");
  const [addresse, setAddresse] = useState("");
  const [prixNuitee, setPrixNuitee] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [devise, setDevise] = useState("FCFA");
  const [imageFile, setImageFile] = useState(null);
  const [oldImage, setOldImage] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Vous devez être connecté !");
          navigate("/");
          return;
        }

        const res = await fetch(
          `https://projethotel-1.onrender.com/api/hotels/${id}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          alert("Impossible de charger les données de l'hôtel !");
          navigate("/liste-hotel");
          return;
        }

        const data = await res.json();

        setNomHotel(data.nomHotel || "");
        setAddresse(data.addresse || "");
        setPrixNuitee(data.prixNuitee || "");
        setNumero(data.numero || "");
        setEmail(data.email || "");
        setDevise(data.devise || "FCFA");
        setOldImage(data.cheminImage || null);

        setLoading(false);
      } catch (error) {
        console.error(error);
        alert("Erreur réseau !");
      }
    };

    fetchHotel();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté !");
      navigate("/");
      return;
    }

    const formData = new FormData();
    formData.append("nomHotel", nomHotel);
    formData.append("addresse", addresse);
    formData.append("prixNuitee", prixNuitee);
    formData.append("numero", numero);
    formData.append("email", email);
    formData.append("devise", devise);
    formData.append("_method", "PUT");

    if (imageFile) formData.append("cheminImage", imageFile);

    try {
      const res = await fetch(
        `https://projethotel-1.onrender.com/api/hotels/${id}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
          body: formData,
        }
      );

      if (res.ok) {
        alert("Hôtel modifié !");
        navigate("/liste-hotel");
      } else {
        const errText = await res.text();
        console.log(errText);
        alert("Erreur lors de la modification");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau !");
    }
  };

  if (loading) return <p className="text-center">Chargement...</p>;

  return (
    <div className="flex justify-center py-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-2xl border space-y-6"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Modifier l’hôtel</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Nom hôtel</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={nomHotel}
              onChange={(e) => setNomHotel(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Adresse</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={addresse}
              onChange={(e) => setAddresse(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Prix Nuitée</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={prixNuitee}
              onChange={(e) => setPrixNuitee(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Numéro</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Devise</label>
            <select
              className="select select-bordered w-full"
              value={devise}
              onChange={(e) => setDevise(e.target.value)}
            >
              <option value="FCFA">FCFA</option>
              <option value="Euro">Euro</option>
              <option value="Dollar">Dollar</option>
            </select>
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-1">Image actuelle</label>
            {oldImage ? (
              <img
                src={oldImage}
                alt="hotel"
                className="h-28 rounded-xl object-cover mb-2 w-full"
              />
            ) : (
              <p className="text-gray-500">Aucune image disponible</p>
            )}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-1">Nouvelle image (optionnel)</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
              <span className="text-gray-500">
                {imageFile
                  ? `Image sélectionnée : ${imageFile.name}`
                  : "Cliquez pour choisir une image"}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        <button className="btn bg-success text-white w-full mt-4 text-lg">
          Modifier l’hôtel
        </button>
      </form>
    </div>
  );
}
