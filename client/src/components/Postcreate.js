import { React, useState } from "react";
import axios from "axios";

const Postcreate = () => {
  const [title, setTitle] = useState("");

  const FormSubmit = async (event) => {
    event.preventDefault();
    console.log(title);
    await axios.post("http://localhost:4000/post", {
      title,
    });
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={FormSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
};

export default Postcreate;
