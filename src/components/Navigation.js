import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
   return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <div className="container">
            <div className="navbar-header">
               Trade Monitor
               </div>
            <div className="collapse navbar-collapse">
               <ul className="nav navbar-nav">
                  <li><Link to="/" className="nav-link">Home</Link></li>
                  <li><Link to="/add" className="nav-link">Add Stock Entry</Link></li>
               </ul>
            </div>
         </div>
      </nav>
   );
}

export default Navigation;