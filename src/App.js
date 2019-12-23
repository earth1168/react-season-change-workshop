import React from "react"; //ประกาศใช้งาน react
import "./App.css";
import moment from "moment"; //lib เกี่ยวกับการจับเวลา นับเวลา
import Input from "./Input.js"; // เอา component ของไฟล์ input.js มาใช้
import axios from "axios"; // lib เกี่ยวกับการจัดการ API

const subjects = ["Angular", "React", "Golang"];
const targetDate = moment("12/21/2019 17:00:00"); //เวลาที่ต้องการจะเทียบ
function App() {
  const [name, setName] = React.useState("");   //ใช้งาน react state (การใช้ state ทำให้ค่าเปลี่ยนแปลงได้)
  const [mail, setMail] = React.useState("");   //ในกรณีนี้ ตัวแปรตัวแรกคือตัวแปรที่ใช้เก็บข้อมูล ตัวแปร set คล้าย ๆ กับการ trigger 
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

  const updateTimer = () => { //เทียบเวลาปัจจุบันว่าอีกกี่ชั่วโมงจะถึงกับเวลาที่กำหนดด้านบน
    const diffHours = targetDate.diff(moment(), "hours");
    const diffMinutes = targetDate.diff(moment(), "minutes") % 60;
    const diffSeconds = targetDate.diff(moment(), "seconds") % 60;

    setTimer(
      `${diffHours} hours ${diffMinutes} minutes ${diffSeconds} seconds`
    );
    // console.log(diffHours, diffMinutes, diffSeconds);
  };
  React.useEffect(() => { //ทำให้ข้อมูลมีการ update ทุก ๆ 1s. 
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

  console.log("State", { name, mail, selectsubject, agree }); //ทุกการเปลี่ยนแปลงที่เกิดขึ้นกับข้อมูลจะถูก print บน console
  return (
    <div className="App">
      <div className="title">Seasons change Registration form</div>
      <p>Form ends in </p>
      <p>{timer}</p>
      <Input        // <Input /> เป็น component ที่ export มาจากไฟล์ Input.js
        label="Name" //ข้อมูลที่ส่งไปให้ Input.js มี 3 ตัว; label = ชื่อ
        value={name} //value = ค่าที่ต้องการจะบันทึก
        onChangeFromComponent={value => setName(value)} //ตัว trigger (setName)
      />
      <Input
        label="Email" //เทียบ <Input /> จากโค้ดที่คอมเม้นด้านล่างได้
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
              value={selectsubject} //เก็บการเปลี่ยนแปลงลงใน selectsubject
              onChange={event => setSelectSubject(event.target.value)}
            >
              {subjects.map(subjects => (     //map คือการวนข้อมูลใน const มาแสดงทั้งหมด (ในโค้ดนี้คือวิชา มี 3 อย่สงคือ angular react golang)
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
              onChange={event => setAgree(event.target.checked)} //กล่องประเภท checkbox ใช้ event.target.checked ไม่เหมือนอันอื่นที่ใช้ event.target.value
            />
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            className={`button is-link ${isLoading && "is-loading"}`} //เช็คว่าปุ่มได้ถูกกดหรือไม่ ถ้าถูกกด ปุ่มจะแสดงเป็นหมุน ๆ ()
            onClick={handleSubmit} //isLoading && "is-loading คือการเช็คประมานว่า ถ้า isLoading เป็น true จะทำให้ button className = "is-loading" (หมุน) แต่ถ้าเป็น false className = button-is-link (ปุ่มปกติ)
            disabled={isLoading} //กดแล้วปุ่มเทา ๆ 
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
