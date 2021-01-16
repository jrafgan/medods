import React, {Component} from 'react';
import {loginUser} from "../Store/Actions/UserActions";
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

const useStyles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
});


class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.loginUser({...this.state});
    };

    render() {
        const {classes} = this.props;

        return (
            <form className={classes.root} id="submit" noValidate autoComplete="off" onSubmit={this.submitFormHandler}>
                <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Login to backoffice</h2>
                <h4 style={{textAlign: 'center', marginBottom: '20px'}}>If you don't have account please
                    register</h4>
                <TextField
                    name="username"
                    error={this.props.error}
                    id="outlined-error-helper-text"
                    label="Username"
                    defaultValue="Enter username"
                    helperText={this.props.error}
                    variant="outlined"
                    onChange={this.inputChangeHandler}
                />
                <TextField
                    name="password"
                    error={this.props.error}
                    id="outlined-error-helper-text"
                    label="Password"
                    defaultValue="Enter password"
                    helperText={this.props.error}
                    variant="outlined"
                    onChange={this.inputChangeHandler}
                />
                <Button  type="submit" form="submit">Click me</Button>

            </form>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: userData => dispatch(loginUser(userData))
});

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Login));