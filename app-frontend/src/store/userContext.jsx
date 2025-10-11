import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({
    name: "",
    loggedIn: false,
    token:""

});

export default function UserContextProvider({children})
{
    const [user, setUser] = useState({id: 0, name:"", loggedIn: false, token: ""});

    function login({id, name, token})
    {
        setUser((prevUser)=>({...prevUser,id:id, name: name, loggedIn: true, token: token}));
        console.log(user);
    }
    function logout()
    {
        setUser(prevUser=> ({...prevUser, id: 0, name:"", loggedIn: false, token:""}));
        console.log(user);
    }

    const userCtx = {
        user: user,
        logout: logout,
        login: login
    }
    return <UserContext.Provider value={userCtx}>{children}</UserContext.Provider>

}