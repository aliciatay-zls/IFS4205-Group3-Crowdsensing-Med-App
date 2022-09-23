import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Patient_Dashboard.module.css";
import { GENERATE_SESSION_URL } from "../api/constants";
import axios from "axios";

const Generate_Session = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("accessToken");
  const [examId, setExamId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    post();
  });

  const post = async () => {
    axios
      .post(GENERATE_SESSION_URL, {
        token: token,
        userId: userId,
      })
      .then(function (response) {
        setExamId(response?.data?.examId);
        setSuccess(true);
      })
      .catch(function (err) {
        setSuccess(true); //comment out
        console.log("here");
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("There was an error, please try again.");
        } else if (err.response?.status === 403) {
          setErrMsg("Action Forbidden");
        } else if (err.response?.status === 500) {
          setErrMsg("Action Forbidden");
        } else {
          setErrMsg("Server encountered an error, please try again.");
        }
      });
  };

  const Allow = async () => {
    navigate("/allowsession");
  };
  const Back = async () => {
    navigate("/patient");
  };

  return (
    <>
      {!success ? (
        <div className={styles.buttons_container}>
          <h2 className={styles.header}>{errMsg}</h2>
          <button className={styles.button} onClick={Back}>
            {" "}
            Back{" "}
          </button>
        </div>
      ) : (
        <div className={styles.container}>
          <h2 className={styles.header}>Generating a Session for {name}</h2>
          <div className={styles.buttons_container}>
            <h2 className={styles.header}>Your session is {examId}.</h2>
            <h2 className={styles.header}>
              Click Allow to give the Doctor full consent to examine you.
            </h2>
            <h3 className={styles.italic}>
              Note: Only Click Allow when you are with a Doctor
            </h3>
            <button className={styles.button} onClick={Back}>
              {" "}
              Back{" "}
            </button>
            <button className={styles.greenButton} onClick={Allow}>
              {" "}
              Allow
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Generate_Session;
