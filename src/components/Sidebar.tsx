import { FiHome, FiPlusCircle } from "react-icons/fi";
import { RiMovieLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const menus = [
    {
      name: "Dashboard",
      url: "/",
      icon: <FiHome />,
    },
    {
      name: "Add Movie",
      url: "addmovie",
      icon: <FiPlusCircle />,
    },
    {
      name: "Movies",
      url: "movie",
      icon: <RiMovieLine />,
    },
    {
      name: "Dashboard",
      url: "/",
      icon: <FiHome />,
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("authToken");

    location.reload();
  };
  return (
    <div className="sidebar">
      <div className="brand">
        <h1>Chenama Para</h1>
      </div>

      <nav className="nav">
        <ul className="nav-menu">
          {menus?.map((item, i) => (
            <li key={i}>
              <Link to={item?.url}>
                {item?.icon} <span>{item?.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="logout">
        <button className="btn " onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
