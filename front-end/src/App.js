import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import {Redirect, Route, Switch, withRouter} from "react-router";
import Login from "./UI/Login";
import BackOffice from "./UI/BackOffice"
import {logoutUser, userSession} from "./Store/Actions/UserActions";


const ProtectedRoute = ({isAllowed, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/"/>
};

class App extends Component {

    logout = () =>{

        return this.props.logoutUser();
    };

    session = () =>{
        return this.props.userSession();
    };

    render() {

        return (
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <ProtectedRoute
                        isAllowed={this.props.user}
                        path="/office"
                        exact
                        render = {() => <BackOffice props={this.props} logout={this.logout} checkSession={this.session}/>}
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    accessToken: state.users.accessToken
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    userSession: () => dispatch(userSession())
});



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
