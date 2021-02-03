import React, {createContext, useCallback, useEffect, useState} from "react";
import axios from 'axios'

const initialState = {
    isAuth: false,
    theUser: {}
};

export const MyContext = createContext(initialState);

// Define the base URL
const Axios = axios.create({
    baseURL: 'http://localhost:8090/online-magazine/',
});

function MyContextProvider(props) {
    const [isAuth,setIsAuth] = useState(false);
    const [theUser,setTheUser] = useState({});
    const [loading,setLoading] = useState(true);



    const getArticles = async () => {
        const articles = await Axios.get('api/getArticles.php',{});

        return articles.data;
    }

    const getArticlesByCategory = async (categoryId) => {
        const articles = await Axios.get('api/getArticles.php',{ params: { id: categoryId } });

        return articles.data;
    }

    const getArticle = async (id) => {
        const article = await Axios.get('api/getArticle.php',{ params: { id: id } });

        return article.data;
    }

    const insertArticle = async (title, body) => {
        const article = await Axios.post('api/insertArticle.php',{
            title: title,
            body: body,
            writer_id:theUser.id,
            user_type_id:theUser.user_type_id
        });

        return article.data;
    }

    const updateArticle = async (title, body) => {
        const article = await Axios.put('api/updateArticle.php',{
            title: title,
            body: body,
            writer_id:theUser.id
        });

        return article.data;
    }

    const deleteArticle = async (id) => {
        const article = await Axios.delete('api/deleteArticle.php',{
            id: id
        });

        return article.data;
    }

    // On Click the Log out button
    const logoutUser = () => {
        localStorage.removeItem('loginToken');
        setIsAuth(false);
    }

    const registerUser = async (user) => {

        // Sending the user registration request
        const register = await Axios.post('login-registration-api/register.php',{
            name:user.name,
            email:user.email,
            password:user.password
        });

        return register.data;
    }


    const loginUser = async (user) => {

        // Sending the user Login request
        const login = await Axios.post('login-registration-api/login.php',{
            email:user.email,
            password:user.password
        });
        return login.data;
    }

    const getLoggedUser = async () => {
        // Fetching the user information
        const {data} = await Axios.get('login-registration-api/user-info.php');
        // If user information is successfully received
        if(data.success && data.user){
            setIsAuth(true);
            setTheUser(data.user);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }

    // Checking user logged in or not
    const isLoggedIn = useCallback(() => {
        const loginToken = localStorage.getItem('loginToken');

        console.log(loginToken)
        // If inside the local-storage has the JWT token
        if(loginToken){
            //Adding JWT token to axios default header
            Axios.defaults.headers.common['Authorization'] = 'bearer '+loginToken;

            getLoggedUser();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        isLoggedIn();
    }, [isLoggedIn]);

    const contextValue = {
        rootState: {isAuth, theUser, loading},
        isLoggedIn,
        registerUser,
        loginUser,
        logoutUser,
        getArticles,
        getArticle,
        insertArticle,
        updateArticle,
        deleteArticle,
        getArticlesByCategory
    }

    return(
        <MyContext.Provider value={contextValue}>
            {props.children}
        </MyContext.Provider>
    );
}

export default MyContextProvider;