import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddHotel() {
  const [nomHotel, setNomHotel] = useState("");
  const [addresse, setAddresse] = useState("");
  const [prixNuitee, setPrixNuitee] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [devise, setDevise] = useState("FCFA");
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nomHotel", nomHotel);
    formData.append("addresse", addresse);
    formData.append("prixNuitee", prixNuitee);
    formData.append("numero", numero);
    formData.append("email", email);
    formData.append("devise", devise);
    formData.append("cheminImage", imageFile);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://projethotel-production.up.railway.app/api/hotels",
        {
          method: "POST",
          headers: {
        "Authorization": `Bearer ${token}`
    },
          body: formData,
        }
      );

      const data = await response.json();
      console.log("DATA =", data);

      if (response.ok) {
        alert("Hôtel ajouté !");
        navigate("/liste-hotel");
      } else {
        alert("Erreur : " + data.message);
      }
    } catch (error) {
      console.error("Erreur fetch:", error);
      alert("Erreur de connexion.");
    }
  };

  return (
  <div className="flex justify-center p-10">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-2xl border space-y-6"
  >
    <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
      Ajouter un Hôtel
    </h2>

    {/* Grid pour aligner les champs côte à côte sur desktop */}
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
        <label className="font-semibold mb-1">Image de l'hôtel</label>
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <span className="text-gray-500">
            {imageFile
              ? `Image sélectionnée : ${imageFile.name}`
              : "Cliquez pour ajouter une image"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </label>
      </div>
    </div>

    <button className="btn bg-success text-white w-full mt-4 text-lg">
      Enregistrer l'hôtel
    </button>
  </form>
</div>
  );
}
