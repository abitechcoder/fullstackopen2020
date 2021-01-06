import React from "react";
import "./Persons.css";

function Persons({ showNumbers, handleDelete }) {
  return (
    <div>
      {showNumbers.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
            <button className="delete_btn" onClick={() => handleDelete(person)}>
              Delete
            </button>
          </p>
        );
      })}
    </div>
  );
}

export default Persons;
