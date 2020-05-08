import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import M from 'materialize-css';
import Dictionary from '../../toolset/dictionary';
import ReactEmailHTML from '../invitation/reactEmailHtml.component';
import {pastTemplateMarker} from './pastTemplateMarker';

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

const StatsDetails = (props) => {
  useEffect(() => {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }, []);

  return (
    <div id={props.item._id} className="modal">
      <div className="modal-content">{ReactEmailHTML(props.item)}</div>
    </div>
  );
};

const StatsCard = (props) => {
  const [average, setAverage] = useState('');

  useEffect(() => {
    let sum=0;
    for (const feedback of props.item.feedback) {
      sum += parseFloat(feedback.generalRating);
    }
    setAverage(sum/props.item.feedback.length);
  }, [props.item.feedback]);

  const getAverage = () => {
    if (isNaN(average)) {
      return ( <h5>No one has rated training yet</h5>);
    } else {
      return (<h5>{parseFloat(average).toFixed(2)}</h5>);
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
            Average meeting rating:
        </span>
        {getAverage()}
      </div>
      <div style={{position: 'absolute'}}>
        {pastTemplateMarker()}
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
      <StatsDetails item={props.item} />
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
          <Link className="btn-flat" to={`/feedback/${props.item._id}`}>
            <i className="material-icons left">mail</i>FEEDBACK
          </Link>
        </div>
      </div>
      <br />
    </div>
  );
};

export default StatsCard;
