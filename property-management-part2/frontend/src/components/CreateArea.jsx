import React, { useState } from "react";
function CreateArea(props) {
  var [Property, setProperty] = useState({
    name: "",
    description: "",
    size: ""
  });
  
  function handleProperty(event) {
    var { name, value } = event.target;
    setProperty((preval) => {
      return {
        ...preval,
        [name]: value
      };
    });
    console.log(Property);
  }
  function addProperty(event) {
    props.onAdd(Property);
    event.preventDefault();
    setProperty({
      name: "",
      description: "",
      size: ""
    });
  }

  return (
    <div>
      <form onSubmit={addProperty}>
        <input
          onChange={handleProperty}
          name="name"
          placeholder="Name"
          value={Property.name}
        />
        <textarea
          onChange={handleProperty}
          name="description"
          placeholder="add Description..."
          rows="3"
          value={Property.description}
        />
        <input
          onChange={handleProperty}
          name="size"
          placeholder="Size"
          value={Property.size}
        />
        <button type="submit">Add Prop</button>
      </form>
    </div>
  );
}

export default CreateArea;
