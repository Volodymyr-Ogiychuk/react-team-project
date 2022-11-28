import { Suspense } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from 'react-router-dom';

const Wallet = () => {

    return (
     <>
      <div>Wallet</div>
     <NavLink to="transactions">Home</NavLink>
     <NavLink to="statistics">Statistics</NavLink>
     <Suspense>
     <Outlet/>
     </Suspense>
    
   </>
    );
  };
  
  export default Wallet;