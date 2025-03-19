import { useContext } from "react";
import AuthContext from "../context/authContext";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <p> Profile: {user?.email || "No user logged in"}</p>  
    </div>
  );
}

export default Dashboard;
