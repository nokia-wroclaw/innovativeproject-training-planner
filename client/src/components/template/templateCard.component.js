import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactEmailHTML from "../invitation/reactEmailHtml.component";
import axios from "axios";
import M from "materialize-css";

const sendInv = invID => {
  return `/sendInvite/${invID}`;
};

const setCardIcon = trainingType => {
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
    elems = document.querySelectorAll(".pushpin");
    M.Pushpin.init(elems);
  }, []);

  const deleteThis = e => {
    e.preventDefault();
    axios.post(`/inviteTemplate/delete/${props.item._id}`).then(res => {
      console.log(res.data);
    });
    window.location.reload(); // for now
  };

  return (
    <div id={props.item._id} className="modal">
      <div className="modal-footer">
        <div className="row">
          <div className="col s3 offset-s2">
            <a href="/" className="modal-close  btn-flat" onClick={deleteThis}>
              <i className="material-icons red-text text-lighten-1 left">
                delete
              </i>
              DELETE
            </a>
          </div>
          <div className="col s2">
            <Link href="#!" className="modal-close btn-flat ">
              <i className="material-icons left">edit</i>EDIT
            </Link>
          </div>
          <div className="col s2">
            <Link
              className="modal-close btn-flat"
              to={`/sendInvite/${props.item._id}`}
            >
              <i className="material-icons left">mail</i>SEND
            </Link>
          </div>
          <div className="col s1 offset-s2">
            <a href="#!" className="modal-close btn-flat">
              <i className="material-icons gray">close</i>
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="container">
          <div className="divider blue darken-2" />
          <div className="modal-content">{ReactEmailHTML(props.item)}</div>
        </div>
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
            <span className="card-title activator truncate">
              {props.item.title}
            </span>
            <p className="truncate">{props.item.description}</p>
          </div>
          <div className="col s1">{setCardIcon(props.item.trainingType)}</div>
        </div>
        <br />
        <div className="divider" />
      </div>
      <TemplateDetails item={props.item} />
      <div className="row">
        <div className="col s6">
          <a
            className="modal-trigger btn-flat"
            href="#!"
            data-target={props.item._id}
          >
            <i className="material-icons left">event_note</i>DETAILS
          </a>
        </div>
        <div className="col s6">
          <Link className="btn-flat" to={sendInv(props.item._id)}>
            <i className="material-icons left">mail</i>SEND
          </Link>
        </div>
      </div>
      <br />
    </div>
  );
};

export default TemplateCard;
