import React, {useEffect} from 'react';
import M from 'materialize-css';
import Dictionary from '../../toolset/dictionary';
import ReactEmailHTML from '../invitation/reactEmailHtml.component';

const cardColorDictionary = new Dictionary();
cardColorDictionary.add('Software Training', 'software-training');
cardColorDictionary.add('Hardware Training', 'hardware-training');
cardColorDictionary.add('Soft Skills Training', 'soft-training');
cardColorDictionary.add('General Training', 'general-training');

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

const ReminderCard = (props) => {
  return (
    <div
      className={`center reminder-card card hoverable ${cardColorDictionary.get(
          props.item.trainingType,
      )}`}
    >
      <div className="card-content white-text">
        <div className="row">
          <div className="col s10 offset-s1">
            <StatsDetails item={props.item} />
            <div className="row">
              <div className="col s12">
                <a
                  className="modal-trigger white-text card-title "
                  href="#!"
                  data-target={props.item._id}
                >
                  {props.item.title}
                </a>
              </div>
            </div>
            {/* <span className="card-title activator truncate">
{props.item.title}
</span> */}
            <p className="truncate">{props.item.date}</p>
            <p className="truncate">
              {props.item.startTime + ' - ' + props.item.endTime}
            </p>
          </div>
          <div className="col s1">
            <i className="material-icons right">
              {cardIconDictionary.get(props.item.trainingType)}
            </i>
          </div>
        </div>
        {/* <div className="divider" /> */}
      </div>
      {/* <StatsDetails item={props.item} /> */}
      {/* <div className="row">
<div className="col s12">
<a
className="modal-trigger btn-flat"
href="#!"
data-target={props.item._id}
>
<i className="material-icons left">event_note</i>DETAILS
</a>
</div>
</div>
<br /> */}
    </div>
  );
};

export default ReminderCard;
