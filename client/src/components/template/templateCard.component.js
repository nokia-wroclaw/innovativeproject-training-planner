import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

// String.prototype.trunc =
//   String.prototype.trunc ||
//   function(n) {
//     return this.length > n ? this.substr(0, n - 1) + "&hellip;" : this;
//   };

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

const TemplateDetails = props => {
  useEffect(() => {
    let elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});
  }, []);

  return (
    <div id={props.item._id} class="modal">
      <div className="modal-content">
        <h3>{props.item.title}</h3>
        <p>{props.item.date}</p>
        <p>{props.item.startTime}</p>
        <p>{props.item.endTime}</p>
        <p>{props.item.instructor}</p>
        <p>{props.item.agenda}</p>
        <p>{props.item.tion}</p>
        <p>{props.item.willLearn}</p>
        <p>{props.item.mustKnow}</p>
        <p>{props.item.materials}</p>
      </div>
      <div className="modal-footer">
        <a href="#!" class="modal-close btn-flat">
          <i className="material-icons right">close</i>
        </a>
      </div>
    </div>
  );
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
        </span>
        <p>{props.item.date}</p>
      </div>
      <div className="card-content white-text">
        <div className="row">
          <div className="col s10 offset-s1">
            <span className="card-title activator">{props.item.title}</span>
            <p className="truncate">{props.item.description}</p>
          </div>
          <div className="col s1">{setCardIcon(props.item.trainingType)}</div>
        </div>
        <div className="row"></div>
        <div class="divider"></div>
      </div>
      <TemplateDetails item={props.item} />
      <div className="row">
        <div className="col s6">
          <a className="modal-trigger btn-flat" data-target={props.item._id}>
            <i class="material-icons left">event_note</i>DETAILS
          </a>
        </div>
        <div className="col s6">
          <Link className="btn-flat" to={sendInv(props.item._id)}>
            <i class="material-icons left">mail</i>SEND
          </Link>
        </div>
      </div>
      <div className="row"></div>
    </div>
  );
};

export default TemplateCard;
