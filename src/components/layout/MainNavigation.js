import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Inventario</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/productos' activeClassName={classes.active}>
              Todos los Productos
            </NavLink>
          </li>
          <li>
            <NavLink to='/agregar-producto' activeClassName={classes.active}>
              Añadir
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
