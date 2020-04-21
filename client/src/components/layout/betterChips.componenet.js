import React, { useEffect, useState } from "react";

const BetterChips = props => {
  // props: inputType, label, required
  const [inputValue, setInputValue] = useState("");
  const [chipsContent, setChipsContent] = useState([]);

  const onEnter = props.onEnter;
  useEffect(() => {
    onEnter(chipsContent);
  }, [onEnter, chipsContent]);

  const validEmail = mail => {
    // checks of the mail is a valid with regex
    // improper regex (passes: name@mail) needed, because materilize's validate
    // thinks that's good enough
    // for a proper mail add "+\.[A-Z]" here ---------------V
    let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]{2,}$/gim;
    return re.test(mail);
  };

  const containsObject = (obj, list) => {
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
  };

  const keyPress = e => {
    // if a button is pressed when the field is being filled
    // 13 - enter, 32 - space, 9 - tab, 188 - ,(comma)
    if (validEmail(e.target.value)) {
      if (
        e.keyCode === 13 ||
        e.keyCode === 32 ||
        e.keyCode === 9 ||
        e.keyCode === 188
      ) {
        if (containsObject(e.target.value, chipsContent)) {
          e.preventDefault();
          setInputValue("");
          return;
        }
        if (e.keyCode === 13) {
          e.preventDefault();
        }
        let test = [...chipsContent, e.target.value];
        console.log(test);
        setChipsContent(test);
        setInputValue("");
      }
    }
  };

  return (
    <div className="input-field">
      <label>{props.label}</label>
      <input
        required={props.required}
        type={props.inputType}
        value={inputValue}
        onChange={e => setInputValue(e.target.item)}
        onKeyDown={keyPress}
      />
      {props.value.map(email => (
        <div className="chip">
          {email}
          <i className="close material-icons">close</i>
        </div>
      ))}
    </div>
  );
};

export default BetterChips;
