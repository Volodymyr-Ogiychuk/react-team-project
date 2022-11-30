import { Suspense } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { Currency } from './Currency';

const Wallet = () => {

    return (
     <>
      <div>Wallet</div>
     <NavLink to="transactions">Home</NavLink>
     <NavLink to="statistics">Statistics</NavLink>
     <Currency />
     <Suspense>
     <Outlet/>
     </Suspense>
    
   </>
    );
  };
  
  export default Wallet;