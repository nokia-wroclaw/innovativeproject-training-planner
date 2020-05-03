import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import ReactEmailHTML from '../invitation/reactEmailHtml.component';
import axios from 'axios';
import M from 'materialize-css';
import Dictionary from '../../toolset/dictionary';

const cardColorDictionary = new Dictionary();
cardColorDictionary.add('Software Training', '#1e88e5');
cardColorDictionary.add('Hardware Training', '#7c4dff');
cardColorDictionary.add('Soft Skills Training', '#26a69a');
cardColorDictionary.add('General Training', '#9e9e9e');

const cardIconDictionary = new Dictionary();
cardIconDictionary.add('Software Training', 'computer');
cardIconDictionary.add('Hardware Training', 'build');
cardIconDictionary.add('Soft Skills Training', 'group');
cardIconDictionary.add('General Training', 'work');

const TemplateDetails = (props) => {
  useEffect(() => {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }, []);

  const deleteThis = (e) => {
    e.preventDefault();
    axios.post(`/inviteTemplate/delete/${props.item._id}`).then(() => {
      window.location.reload();
    });
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
            <Link
              to={`/inviteTemplate/${props.item._id}`}
              className="modal-close btn-flat "
            >
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

const TemplateCard = (props) => {
  const showSentMark = (isSent) => {
    if (isSent) {
      return (
        <div
          style={{
            width: 0,
            height: 100,
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 25,
            border: 'solid 15px #ffdb4d',
            borderBottom: 'solid 15px transparent',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              position: 'relative',
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              textAlign: 'left',
              color: 'white',
              right: 12,
            }}
          >
            SENT
          </div>
        </div>
      );
    }
  };
  return (
    <div
      className="card hoverable"
      style={{
        backgroundColor: cardColorDictionary.get(props.item.trainingType),
      }}
    >
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
          {props.item.instructor}
        </span>
        <p>{props.item.date}</p>
      </div>
      <div style={{position: 'absolute'}}>
        {showSentMark(props.item.sent)}
      </div>
      <div className="card-content white-text">
        <div className="row">
          <div className="col s10 offset-s1">
            <span className="card-title activator truncate">
              {props.item.title}
            </span>
            <p className="truncate">{props.item.description}</p>
          </div>
          <div className="col s1">
            <i className="material-icons right">
              {cardIconDictionary.get(props.item.trainingType)}
            </i>
          </div>
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
          <Link className="btn-flat" to={`/sendInvite/${props.item._id}`}>
            <i className="material-icons left">mail</i>SEND
          </Link>
        </div>
      </div>
      <br />
    </div>
  );
};

export default TemplateCard;
