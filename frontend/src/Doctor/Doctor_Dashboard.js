import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Doctor_Dashboard.module.css";
import { VIEW_COUNT_URL } from "../api/constants";
import axios from "axios";

const Doctor_Dashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const [crowdCounter, setCrowdCounter] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);

  useEffect(() => {
    axios
      .get(VIEW_COUNT_URL)
      .then(function (response) {
        setCrowdCounter(response.data.count + "%");
        setSuccess(true);
        setBuffer(false);
      })
      .catch(function (err) {
        setFailure(true);
        setBuffer(false);
      });
  });

  const Signout = async () => {
    const { logout } = useAuth();
    logout();
    navigate("/login");
  };

  const Examine = async () => {
    navigate("/assigndoctor");
  };

  if (success) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Welcome {name}!</h2>
        <div class={styles.buttons_container}>
          <div class={styles.circle}>{crowdCounter}</div>
          <div class="examine">
            <button className={styles.button} onClick={Examine}>
              Examine
            </button>
          </div>
          <div class="signout">
            <button className={styles.button} onClick={Signout}>
              Sign out
            </button>
          </div>{" "}
        </div>
      </div>
    );
  } else if (buffer) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Welcome {name}!</h2>
        <div class={styles.buttons_container}>
          <div class={styles.circle}></div>
          <p>Generating...</p>
          <div class="examine">
            <button className={styles.button} onClick={Examine}>
              Examine
            </button>
          </div>
          <div class="signout">
            <button className={styles.button} onClick={Signout}>
              Sign out
            </button>
          </div>{" "}
        </div>
      </div>
    );
  } else if (failure) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Welcome {name}!</h2>
        <div class={styles.buttons_container}>
          <div class={styles.circle}>Error</div>
          <p>There is an error</p>
          <div class="examine">
            <button className={styles.button} onClick={Examine}>
              Examine
            </button>
          </div>
          <div class="signout">
            <button className={styles.button} onClick={Signout}>
              Sign out
            </button>
          </div>{" "}
        </div>
      </div>
    );
  }
};
export default Doctor_Dashboard;
