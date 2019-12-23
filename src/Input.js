import React from "react";
const Input = props => {
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Text input"
          value={props.value}
          onChange={event =>
            props.onChangeFromComponent &&
            props.onChangeFromComponent(event.target.value)
          }
        />
      </div>
    </div>
  );
};
export default Input; 
