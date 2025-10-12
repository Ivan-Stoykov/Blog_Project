import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({
    name: "",
    loggedIn: false,
    

});

export default function UserContextProvider({children})
{
    const [user, setUser] = useState({id: 0, name:"", loggedIn: false, token: ""});

    function login({id, name, token})
    {
        setUser((prevUser)=>({...prevUser,id:id, name: name, loggedIn: true, token: token}));
    }
    function logout()
    {
        setUser(prevUser=> ({...prevUser, id: 0, name:"", loggedIn: false, token:undefined}));
        fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + user.token
        },
      })
    }

    const userCtx = {
        user: user,
        logout: logout,
        login: login,

    }
    return <UserContext.Provider value={userCtx}>{children}</UserContext.Provider>

}