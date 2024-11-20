import React, { createContext, useEffect, useState } from 'react';


const Context = createContext();         // ye vala child me
const ContextProvider = (props) => {     //ye vala main.jsx me wrap krega

     const [login, setLogin] = useState(localStorage.getItem('token'));

       useEffect(() => {
       setLogin(localStorage.getItem('token'));
       }, [localStorage.getItem('token')]);

    

const contextValue = {login, setLogin};
  return ( 
  <Context.Provider value={contextValue}> 
 {props.children}
  </Context.Provider>
  )
};

export {ContextProvider};
export default Context;
