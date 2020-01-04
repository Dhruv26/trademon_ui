import React from 'react';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
   return (
      <div>
         <div className="navbar-header">
            <h3>Trade Monitor</h3>
         </div>
         <NavLink to="/">Home</NavLink>
         <NavLink to="/add">Add Stock Entry</NavLink>
      </div>
   );
}

export default Navigation;