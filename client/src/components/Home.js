import React, {useContext} from 'react'
import {MyContext} from '../contexts/MyContext'
import Blog from './Blog'

// Importing the Login & Register Componet
import Login from './Login'
import Register from './Register'

function Home(){

    const {rootState} = useContext(MyContext);
    const {isAuth, showLogin} = rootState;

    // If user Logged in
    if(isAuth){
        return <Blog />;
   
    }
    // Showing Login Or Register Page According to the condition
    else if(showLogin){
        return <Login/>;
    }
    else{
        return <Register/>;
    }
    
}

export default Home;