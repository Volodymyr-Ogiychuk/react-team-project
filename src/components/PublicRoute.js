import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn } from 'redux/store';
export default function PublicRoute({
  children,
  restricted = false,
  redirectTo = '/'
}) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const shouldNavigate = !isLoggedIn && restricted;
  return shouldNavigate ? children : <Navigate to={redirectTo} />
  
}
