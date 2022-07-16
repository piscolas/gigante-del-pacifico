import { RiDashboardLine, RiProductHuntLine, RiUser3Fill, RiUser3Line } from "react-icons/ri";
import { Link } from 'react-router-dom';


export function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4 vh-100">

      <h3 className="text-white"> Pacífico</h3>


      <div className="sidebar">

        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">

          </div>
          <h5 className="text-white">Tomás</h5>
        </div>

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

            {/* Dashboard*/}
            <li className="nav-item">
              <Link to="/user/dashboard" className="nav-link">
                <RiDashboardLine />
                <p className="pl-2">
                  Dashboard
                </p>
              </Link>
            </li>

            {/* Clients*/}
            <li className="nav-item">
              <Link to="/client" className="nav-link">
                <RiUser3Line />
                <p className="pl-2">
                  Clientes
                </p>
              </Link>

            </li>

            {/* Users*/}
            <li className="nav-item">
              <Link to="/user" className="nav-link">
                <RiUser3Fill />
                <p className="pl-2">
                  Usuarios
                </p>
              </Link>
            </li>

            {/* Productos*/}
            <li className="nav-item">
              <Link to="/product" className="nav-link">
                <RiProductHuntLine />
                <p className="pl-2">
                  Productos
                </p>
              </Link>
            </li>

          </ul>
        </nav>

      </div>

    </aside>
  )
}