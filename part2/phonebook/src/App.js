import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/persons";
import Notification from "./components/Notification";
import Error from "./components/Error";
import "./components/Notification.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => console.log(error));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const exist = persons.find((person) => person.name === newName);
    if (exist) {
      if (
        window.confirm(
          `${exist.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const newPersonObject = {
          name: exist.name,
          number: newNumber,
          id: exist.id,
        };
        phonebookService
          .update(exist.id, newPersonObject)
          .then((returnedData) => {
            const updatedPhonebook = persons
              .filter((person) => person.id !== exist.id)
              .concat(returnedData);
            setPersons(updatedPhonebook);
            setNewName("");
            setNewNumber("");
            setSuccessMessage(`${returnedData.name} number has been updated.`);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newPersonObject.name} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.log("Update cancelled");
      }
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      phonebookService
        .create(newPersonObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setSuccessMessage(`Added ${newPersonObject.name}`);
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const handleNameSearch = (event) => {
    let searchTxt = event.target.value;
    setSearchText(searchTxt);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDelete = ({ id, name }) => {
    if (window.confirm(`Delete ${name} from the Phonebook`)) {
      phonebookService
        .deletePerson(id)
        .then((data) => {
          if (data) {
            alert(`${name} is deleted from the Phonebook`);
            setPersons(persons.filter((person) => person.id !== id));
          }
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    } else {
      console.log("Don't play with delete button");
    }
  };

  const showNumbers =
    searchText === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().startsWith(searchText)
        );
  const AlertComponent =
    successMessage !== null ? (
      <Notification message={successMessage} />
    ) : (
      <Error message={errorMessage} />
    );
  return (
    <div>
      <h2>Phonebook</h2>
      {AlertComponent}
      <Filter handleNameSearch={handleNameSearch} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons showNumbers={showNumbers} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
