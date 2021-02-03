import React, {useContext} from 'react';
import {MyContext} from './contexts/MyContext';
import Home from './components/Home'
import Error from './components/Error'
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
        const {rootState} = useContext(MyContext);
        const {isAuth, loading} = rootState;

        console.log(isAuth,loading)

        return (
            <React.Fragment>
                {
                    loading === true ? <LoadingSpinner /> :
                        <Switch>
                            <Route path="/login" exact>
                                {isAuth ? <Redirect to="/" /> : <Login />}
                            </Route>
                            <Route path="/register" exact>
                                {isAuth ? <Redirect to="/" /> : <Register />}
                            </Route>
                            <Route path="/" exact>
                                {isAuth ? <Home /> : <Redirect to="/login" />}
                            </Route>
                            <Route component={Error} />
                        </Switch>
                }
            </React.Fragment>
    )
}