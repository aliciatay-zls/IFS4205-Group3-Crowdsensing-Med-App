import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Patient_Dashboard.module.css";
import { GENERATE_SESSION_URL } from "../../api/constants";
import axios from "axios";
import loading from "../imports/loading.gif";

const Generate_Session = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("accessToken");
  const [examId, setExamId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);
  const tokenString = " Token " + token;

  useEffect(() => {
    post();
  });

  const post = async () => {
    axios
      .get(GENERATE_SESSION_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenString,
        },
      })
      .then(function (response) {
        setExamId(response?.data?.examId);
        localStorage.setItem("examId", response?.data?.examId);
        setSuccess(true);
        setBuffer(false);
      })
      .catch(function (err) {
        // setSuccess(true); //comment out
        // setBuffer(false); //comment out
        // setExamId("12345"); //comment out
        // localStorage.setItem("examId", "12345"); //comment out

        setFailure(true);
        setBuffer(false);
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg(err.response.data.message);
        } else if (err.response?.status === 401) {
          setErrMsg(err.response.data.message);
        } else if (err.response?.status === 403) {
          setErrMsg(err.response.data.message);
        } else if (err.response?.status === 405) {
          setErrMsg(err.response.data.message);
        } else if (err.response?.status === 500) {
          setErrMsg(err.response.data.message);
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

  if (success) {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Generating a Session for {name}</h1>
        <div className={styles.buttons_container}>
          <h2 className={styles.header}>Session ID: {examId}</h2>
          <h2 className={styles.header}>
            Click Allow to give the Doctor full consent to examine you.
          </h2>
          <h2 className={styles.italic}>
            Note: Only Click Allow when you are with a Doctor
          </h2>
          <button className={styles.button} onClick={Back}>
            {" "}
            Back{" "}
          </button>
          <button className={styles.allowButton} onClick={Allow}>
            {" "}
            Allow
          </button>
        </div>
      </div>
    );
  } else if (buffer) {
    return (
      <div className={styles.buttons_container}>
        <img className={styles.loading} src={loading} alt="loading..." />
        <h2 className={styles.header}>Generating...</h2>
      </div>
    );
  } else if (failure) {
    return (
      <div className={styles.buttons_container}>
        <h2 className={styles.header}>{errMsg}</h2>
        <button className={styles.button} onClick={Back}>
          {" "}
          Back{" "}
        </button>
      </div>
    );
  }
};
export default Generate_Session;