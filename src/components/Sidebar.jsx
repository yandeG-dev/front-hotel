import { useNavigate } from "react-router-dom";

export default function Sidebar({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); 
    navigate("/");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
   
        <nav className="navbar w-full bg-base-300 justify-between">
          <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
       
           <p>Hotel</p>
          </label>

          {user && (
            <div className="flex items-center gap-2 pr-4">
              <span className="font-semibold">{user.name}</span>
              <span className="text-sm opacity-70">{user.email}</span>
            </div>
          )}
        </nav>

        {children}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col bg-base-200 w-64">
    
          <ul className="menu p-2 grow">
            <li>
              <button onClick={() => navigate("/liste-hotel")}>
                Liste des hôtels
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>
            </li>
          </ul>

          <div className="p-4 w-full mt-auto">
            <button className="btn btn-error w-full" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
