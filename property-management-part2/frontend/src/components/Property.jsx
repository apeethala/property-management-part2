import React from "react";

function Property(props) {
  return (
    <div className="note">
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <p>{props.size}</p>
      <button
        onClick={() => {
          props.onclicked(props.id);
        }}
      >
        DELETE
      </button>
    </div>
  );
}

export default Property;
