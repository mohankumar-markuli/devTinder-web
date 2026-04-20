import { useSelector } from "react-redux";
const NavBar = () => {

  const user = useSelector((store) => store.user);

  return (
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DevTinder</a>
        </div>
                {user && (
        <div className="flex gap-2">
        <div className="form-control flex items-center"> Welcome, {user.firstName}</div>
        <div className="dropdown dropdown-end mx-10 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user avatar"
                  src={user.profileUrl || "https://imgs.search.brave.com/UTr6veG4xMIDEu0VF_H2a7AXfxHqAwAIoUjnTGIVw9Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvdGh1bWJu/YWlsL2RlZmF1bHQt/dXNlci1wcm9maWxl/LWljb24tbGVtbzg1/N3RqMWIzaW8yMS53/ZWJw"}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
           </div>
        )} 
       
      </div>
  );
};

export default NavBar;