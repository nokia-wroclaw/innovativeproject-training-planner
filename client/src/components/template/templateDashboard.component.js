import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TemplateCard from "./templateCard.component";
import axios from "axios";

const list = [
  {
    _id: "1",
    instructor: "Testowy Instruktor",
    title: "Testowy Tytuł - baza nie działa",
    date: "10/2/2020",
    description: "Testowy Opis"
  }
];

const TemplateDashboard = () => {
  const [templatelist, setTemplateList] = useState(list);
  
  useEffect(() => {
    axios.get("/inviteTemplate/getall").then(response => {
      setTemplateList(response.data);
    });
  }, []);

  return (
    <div className="container center">
      <h5 className="center">
        <Link
          to="/inviteTemplate"
          className="btn-floating pulse btn-large waves-effect waves-light pink lighten-1"
        >
          <i className="material-icons">add</i>
        </Link>
      </h5>
      <div className="row">
        {templatelist.map(item => (
          <div className="col s12 m6" key={item._id}>
            {" "}
            <TemplateCard item={item} />{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateDashboard;
