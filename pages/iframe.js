//This is so that kanban can be imported as an iframe

import Navbar from "../components/navbar.js";
import Login from "../components/login.js";
import Kanban from "../components/kanban.js";
import { useAuthContext } from "../firebase/context";

export default function Iframe() {
  const { user } = useAuthContext();

  return (
    <div style={{ overflowY: "scroll" }}>
      {user ? (
        <div>
          <Kanban />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}