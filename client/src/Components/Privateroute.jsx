import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function Privateroute() {          //ye shi chiz hai 
  
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? <Outlet /> : <Navigate to='/signin' />;
  
}
