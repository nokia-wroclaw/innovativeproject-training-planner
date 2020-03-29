import React from "react";
import { Link } from "react-router-dom";

String.prototype.trunc =
  String.prototype.trunc ||
  function(n) {
    return this.length > n ? this.substr(0, n - 1) + "&hellip;" : this;
  };

const sendInv = invID => {
  return `/sendInvite/${invID}`;
};

const setCardIcon = trainingType => {
  let cardColor;
  if (trainingType === "Software Training")
    return <i className="material-icons right">computer</i>;
  else if (trainingType === "Hardware Training")
    return <i className="material-icons right">build</i>;
  else if (trainingType === "Soft Skills Training")
    return <i className="material-icons right">group</i>;
  else return <i className="material-icons right">work</i>;
};

const setCardColor = trainingType => {
  let cardColor;
  if (trainingType === "Software Training") cardColor = "#1e88e5";
  // blue darken-1
  else if (trainingType === "Hardware Training") cardColor = "#7c4dff";
  // deep-purple accent-2
  else if (trainingType === "Soft Skills Training") cardColor = "#26a69a";
  // teal lighten-1
  else cardColor = "#9e9e9e";
  return cardColor;
};

const TemplateCard = props => {
  return (
    <div
      className="card hoverable"
      style={{ backgroundColor: setCardColor(props.item.trainingType) }}
    >
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
          {props.item.instructor}
          {/* <i className="material-icons right">close</i> */}
        </span>
        <p>{props.item.date}</p>
      </div>
      <div className="card-content white-text">
        {setCardIcon(props.item.trainingType)}
        <span className="card-title activator">{props.item.title}</span>
        <p>{props.item.description.trunc(80)}</p>
      </div>{" "}
      <div className="card-action">
        <Link to={sendInv(props.item._id)}>Send Invitation</Link>
      </div>
    </div>
  );
};

export default TemplateCard;
