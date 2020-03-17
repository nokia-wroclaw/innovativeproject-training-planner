import React from 'react';
import { Link } from 'react-router-dom';
import TemplateCard from "./templateCard.component"

const TemplateDashboard = () => {

    return(
        <div className="container center">
            <TemplateCard/>
            <TemplateCard/>
            <h5 className="center">
                <Link to="/inviteTemplate" className="btn-floating btn-large waves-effect waves-light pink lighten-1"><i className="material-icons">add</i></Link>
            </h5>
        </div>
    )
}

export default TemplateDashboard;