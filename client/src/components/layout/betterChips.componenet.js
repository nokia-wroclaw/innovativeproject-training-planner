import React, { useEffect, useState } from "react";

const BetterChips = props => {
  // props: inputType, label
  const [inputValue, setInputValue] = useState("");
  const [chipsContent, setChipsContent] = useState([]);

  const validEmail = mail => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
  };

  useEffect(() => {
    props.onEnter(chipsContent);
  }, [props, chipsContent]);

  const keyPress = e => {
    if (e.keyCode === 13 && validEmail(e.target.value)) {
      e.preventDefault();
      let test = [...chipsContent, e.target.value];
      console.log(test);
      setChipsContent(test);
      setInputValue("");
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