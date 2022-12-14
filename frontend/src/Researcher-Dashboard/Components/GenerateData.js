import * as React from "react";
import "../Researcher.css";
import Title from "../../Components/Title";
import loading from "../../imports/loading.gif";
import axios from "axios";
import { VIEW_ANON_DATA_URL } from "../../api/constants";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { TablePagination } from "react-pagination-table";

export default function GenerateData() {
  const token = sessionStorage.getItem("accessToken");
  const tokenString = " Token " + token;
  const age = sessionStorage.getItem("age");
  const height = sessionStorage.getItem("height");
  const weight = sessionStorage.getItem("weight");
  const allergies = sessionStorage.getItem("allergies");
  const race = sessionStorage.getItem("race");
  const sex = sessionStorage.getItem("sex");
  const diagnosis = sessionStorage.getItem("diagnosis");
  const zipcode = sessionStorage.getItem("zipcode");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [anonRecords, setAnonyRecords] = useState();
  const headers = [
    "Zipcode Range",
    "Age",
    "Height",
    "Weight",
    "Allergies",
    "Race",
    "Sex",
    "Diagnosis",
  ];

  useEffect(() => {
    axios
      .post(
        VIEW_ANON_DATA_URL,
        {
          age: age,
          height: height,
          weight: weight,
          zipcode: zipcode,
          allergies: allergies,
          sex: sex,
          diagnosis: diagnosis,
          race: race,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenString,
          },
        }
      )
      .then(function (response) {
        setAnonyRecords(response.data);
        console.log(response);
        setSuccess(true);
        setBuffer(false);
      })
      .catch(function (err) {
        setFailure(true);
        setBuffer(false);
        if (!err.response) {
          setErrMsg("No Server Response");
        } else if (err.response.status === 400) {
          setErrMsg(err.response.data.message);
        } else if (err.response.status === 401) {
          setErrMsg(err.response.data.message);
        } else if (err.response.status === 403) {
          setErrMsg(err.response.data.message);
        } else if (err.response.status === 405) {
          setErrMsg(err.response.data.message);
        } else if (err.response.status === 500) {
          setErrMsg(err.response.data.message);
        } else {
          setErrMsg("Server encountered an error, please try again.");
        }
      });
  }, [
    age,
    allergies,
    diagnosis,
    height,
    race,
    weight,
    zipcode,
    sex,
    tokenString,
  ]);

  if (success) {
    return (
      <React.Fragment>
        <Title>K-Anonymity Record</Title>
        <br></br>
        <CSVLink data={anonRecords} filename={"anon_records.csv"}>
          <font size="5" color="black">
            Click to Download CSV
          </font>{" "}
        </CSVLink>
        <br></br>
        <TablePagination
          headers={headers}
          data={anonRecords}
          columns="zipcode_range.age_range.height_range.weight_range.allergies.race.sex.diagnosis"
          perPageItemCount={50}
          totalCount={anonRecords.length}
          arrayOption={[["size", "all", " "]]}
        />
      </React.Fragment>
    );
  } else if (buffer) {
    return (
      <div>
        <Title>Generating...</Title>
        <img src={loading} alt="loading..." />
      </div>
    );
  } else if (failure) {
    return (
      <div>
        <Title>{errMsg}</Title>
      </div>
    );
  }
}
