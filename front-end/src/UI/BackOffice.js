import React from 'react';
import Button from "@material-ui/core/Button";

const BackOffice = props => {

    return (<div className="main_nav">
        <p>Wellcome back to Backoffice</p>
        <p>{props.props.user.username}</p>
        <p>Access token expires in 30 sec</p>
        <Button onClick={props.logout} variant="contained" color="secondary">
            Logout
        </Button>
        <br/>
        <br/>
        <br/>
        <Button onClick={props.checkSession} variant="contained" color="secondary">
            Check session
        </Button>
    </div>)
};


export default BackOffice;