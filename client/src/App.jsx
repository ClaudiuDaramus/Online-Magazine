import React, {useContext} from 'react';
import {MyContext} from './contexts/MyContext';
import Home from './components/Home'
import Error from './components/Error'
import {Route, Switch, Redirect} from 'react-router-dom';
import BehindTheLinesOfCode from "./components/BehindTheLinesOfCode";
import ArticleByCategory from "./components/ArticleByCategory";
import Login from "./components/Login";
import Register from "./components/Register";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
        const {rootState} = useContext(MyContext);
        const {isAuth, loading} = rootState;

        return (
            <React.Fragment>
                {
                    loading === true ? <LoadingSpinner /> :
                        <Switch>
                            <Route path="/reviews" exact>
                                {isAuth ? <ArticleByCategory /> : <Redirect to="/login" />}
                            </Route>
                            <Route path="/trailers" exact>
                                {isAuth ? <ArticleByCategory /> : <Redirect to="/login" />}
                            </Route>
                            <Route path="/movies" exact>
                                {isAuth ? <ArticleByCategory /> : <Redirect to="/login" />}
                            </Route>
                            <Route path="/tv-shows" exact>
                                {isAuth ? <ArticleByCategory /> : <Redirect to="/login" />}
                            </Route>
                            <Route path="/interviews" exact>
                                {isAuth ? <ArticleByCategory /> : <Redirect to="/login" />}
                            </Route>
                            <Route path="/festivals-&-events" exact>
                                {isAuth ? <ArticleByCategory /> : <Redirect to="/login" />}
                            </Route>
                            <Route path="/filmmaking" exact>
                                {isAuth ? <ArticleByCategory /> : <Redirect to="/login" />}
                            </Route>
                            <Route path="/short-films" exact>
                                {isAuth ? <ArticleByCategory /> : <Redirect to="/login" />}
                            </Route>
                            <Route path="/behind-the-lines-of-code" exact>
                                {isAuth ? <BehindTheLinesOfCode /> : <Redirect to="/login" />}
                            </Route>
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