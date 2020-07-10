import React, { useContext } from 'react';
import UserContext from '../context/UserContext';


function Button(){
    const user =  useContext(UserContext)
    
    
const handleLogout = () =>{
    user.logout()
  }
return(
    <button onClick={handleLogout}>logout </button>
)

     

}
 
export default Button;