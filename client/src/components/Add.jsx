import React, { useState } from "react";
import axios from "axios";

function Add() {
    var [issue,setIssue] = useState({title:"", content:"", status:"open"});

    function change(event) {
        var {name, value} = event.target;

        setIssue((prevIssue) => {
        return {
          ...prevIssue,
          [name]: value
        };
      });
    }

    function addIssue(event) {
        event.preventDefault();
        axios.post("/issues/add", issue)
          .then(function(res) { 
            console.log(res.data);
        });
        setIssue({
          title:"", 
          content:"",
          likes:0
        });
        window.location = "/";
    }
    return <div>
    <div className="upper-margin"> <h1> Ask your Issue! </h1> </div> 
    <div>
        <textarea
            name="title"
            value={issue.title}
            className="margin"
            placeholder="Title"
            rows="1"
            cols="50"
            onChange={change}
            required
        />
     </div>
     <div>
        <textarea
            name="content"
            value={issue.content}
            className="margin"
            placeholder="Description"
            rows="5"
            cols="50"
            onChange={change}
            required
        />
     </div>
     
    <button className="btn btn-green expand margin" onClick={addIssue}> Add </button> 

</div>
};

export default Add;