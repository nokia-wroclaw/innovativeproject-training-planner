import React from "react";
import { Link } from "react-router-dom";

String.prototype.trunc =
  String.prototype.trunc ||
  function(n) {
    return this.length > n ? this.substr(0, n - 1) + "&hellip;" : this;
  };

const TemplateCard = props => {
  return (
    <div className="card blue darken-1">

      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
          {props.item.instructor}
          <i className="material-icons right">close</i>
        </span>
        <p>{props.item.date}</p>
      </div>

      <div className="card-content white-text">
        <span className="card-title activator">{props.item.title}</span>
        <p>{props.item.description.trunc(80)}</p>
      </div>{" "}

      <div className="card-action">
        <Link to="/sendInvite">Send Invitation</Link>
      </div>

    </div>
  );
};

export default TemplateCard;
