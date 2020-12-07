import React, { createContext,Component } from "react";
import axios from 'axios'
export const MyContext = createContext();

// Define the base URL
const Axios = axios.create({
    baseURL: 'http://localhost/online-magazine/',
});

class MyContextProvider extends Component{
    constructor(){
        super();
        this.isLoggedIn();
    }

    // Root State
    state = {
        showLogin:true,
        isAuth:false,
        theUser:null
    }

    getArticles = async () => {
        const articles = await Axios.get('api/getArticles.php',{});

        return articles.data;
    }

    getArticlesByCategory = async (categoryId) => {
        const articles = await Axios.get('api/getArticles.php',{
            id: categoryId
        });

        return articles.data;
    }

    getArticle = async (id) => {
        const article = await Axios.get('api/getArticle.php',{
            id: id
        });

        return article.data;
    }

    insertArticle = async (title, body) => {
        const article = await Axios.post('api/insertArticle.php',{
            title: title,
            body: body,
            writer_id:this.state.theUser.id
        });

        return article.data;
    }

    updateArticle = async (title, body) => {
        const article = await Axios.put('api/updateArticle.php',{
            title: title,
            body: body,
            writer_id:this.state.theUser.id
        });

        return article.data;
    }

    deleteArticle = async (id) => {
        const article = await Axios.delete('api/deleteArticle.php',{
            id: id
        });

        return article.data;
    }

    updateSubscription = async () => {
        const user = await Axios.put('api/updateSubscription.php',{
            id: this.state.theUser.id
        });
        this.getLoggedUser();

        return user.data;
    }
    
    // Toggle between Login & Signup page
    toggleNav = () => {
        const showLogin = !this.state.showLogin;
        this.setState({
            ...this.state,
            showLogin
        })
    }

    // On Click the Log out button
    logoutUser = () => {
        localStorage.removeItem('loginToken');
        this.setState({
            ...this.state,
            isAuth:false
        })
    }

    registerUser = async (user) => {

        // Sending the user registration request
        const register = await Axios.post('login-registration-api/register.php',{
            name:user.name,
            email:user.email,
            password:user.password,
            subscription:user.subscription === true ? 1 : 0
        });

        return register.data;
    }


    loginUser = async (user) => {

        // Sending the user Login request
        const login = await Axios.post('login-registration-api/login.php',{
            email:user.email,
            password:user.password
        });
        return login.data;
    }

    getLoggedUser = async  () => {
        // Fetching the user information
        const {data} = await Axios.get('login-registration-api/user-info.php');

        // If user information is successfully received
        if(data.success && data.user){
            this.setState({
                ...this.state,
                isAuth:true,
                theUser:data.user
            });
        }
    }

    // Checking user logged in or not
    isLoggedIn = async () => {
        const loginToken = localStorage.getItem('loginToken');

        // If inside the local-storage has the JWT token
        if(loginToken){

            //Adding JWT token to axios default header
            Axios.defaults.headers.common['Authorization'] = 'bearer '+loginToken;

            this.getLoggedUser();
        }
    }

    render(){
        const contextValue = {
            rootState:this.state,
            toggleNav:this.toggleNav,
            isLoggedIn:this.isLoggedIn,
            registerUser:this.registerUser,
            loginUser:this.loginUser,
            logoutUser:this.logoutUser,
            getArticles:this.getArticles,
            getArticle: this.getArticle,
            insertArticle:this.insertArticle,
            updateArticle:this.updateArticle,
            deleteArticle:this.deleteArticle,
            updateSubscription:this.updateSubscription,
            getArticlesByCategory:this.getArticlesByCategory
        }
        return(
            <MyContext.Provider value={contextValue}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

export default MyContextProvider;