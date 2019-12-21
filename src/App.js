import React from "react";
import logo from "./logo.svg";
import "./App.css";
import moment from "moment";
import Input from "./Input.js";
import axios from "axios";

const subjects = ["Angular", "React", "Golang"];
const targetDate = moment("12/21/2019 17:00:00");
function App() {
  const [name, setName] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [selectsubject, setSelectSubject] = React.useState("");
  const [agree, setAgree] = React.useState("");
  const [timer, setTimer] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState("");

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .get(
        "http://www.mocky.io/v2/5dfde561310000ed1ac96e39?mocky-delay=4000ms&fbclid=IwAR2rmqc31qYNSlCqKsbDZZ2mrj6NyOxSFbjj3IS47SipLpXfgLZfrRVMuiM"
      )
      .then(response => {
        const { data } = response;
        setMessage(data.response);
        setIsLoading(false);
      });
  };

  const updateTimer = () => {
    const diffHours = targetDate.diff(moment(), "hours");
    const diffMinutes = targetDate.diff(moment(), "minutes") % 60;
    const diffSeconds = targetDate.diff(moment(), "seconds") % 60;

    setTimer(
      `${diffHours} hours ${diffMinutes} minutes ${diffSeconds} seconds`
    );
    // console.log(diffHours, diffMinutes, diffSeconds);
  };
  React.useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    axios
      .get(
        "http://www.mocky.io/v2/5dfde8a6310000551ec96e5b?fbclid=IwAR31aAffFytM53mxXhm4yclVoV_wmb5cSLSfgXNAbbChegk6E90AWWh-zIE"
      )
      .then(response => {
        setSelectSubject(response.data.subject);
      });

    return () => clearInterval(interval);
  }, []);

  console.log("State", { name, mail, selectsubject, agree });
  return (
    <div className="App">
      <div className="title">Seasons change Registration form</div>
      <p>Form ends in </p>
      <p>{timer}</p>
      <Input
        label="Name"
        value={name}
        onChangeFromComponent={value => setName(value)}
      />
      <Input
        label="Email"
        value={mail}
        onChangeFromComponent={value => setMail(value)}
      />

      {/*     <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-danger"
            type="email"
            placeholder="Email input"
            //   value="hello@"
            value={mail}
            onChange={event => setMail(event.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p className="help is-danger">This email is invalid</p>
      </div>
*/}
      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select
              value={selectsubject}
              onChange={event => setSelectSubject(event.target.value)}
            >
              {subjects.map(subjects => (
                <option key={subjects}>{subjects}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              value={agree}
              onChange={event => setAgree(event.target.checked)}
            />
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            className={`button is-link ${isLoading && "is-loading"}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
