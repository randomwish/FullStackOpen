import { useState, useEffect } from "react";
import peopleService from "./services/people";

const Filter = (props) => {
  const { showAll, setShowAll, filterElement, handleFilterChange } = props;
  return (
    <>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "filtered" : "all"}
      </button>
      <h1> filter</h1>
      <p>
        filter shown with a{" "}
        <input value={filterElement} onChange={handleFilterChange} />
      </p>
    </>
  );
};

const PersonForm = (props) => {
  const { addName, newName, handleNameChange, handleNumberChange, newNumber } =
    props;
  return (
    <>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};
const DeleteButton = (props) => {
  const { id, deleteElement, name } = props;
  return (
    <>
      <button onClick={() => deleteElement(id, name)}>
        Delete phone number
      </button>
    </>
  );
};
const Persons = (props) => {
  const { namesToShow, deleteElement } = props;
  return (
    <>
      <ul>
        {namesToShow.map((person) => (
          <p key={person.name}>
            {" "}
            {person.name} {person.number}{" "}
            <DeleteButton
              deleteElement={deleteElement}
              name={person.name}
              id={person.id}
            />
          </p>
        ))}
      </ul>
    </>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notification">{message}</div>;
};

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterElement, setFilterElement] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [newMessage, setNewMessage] = useState(null);
  const [newError, setNewError] = useState(null);

  useEffect(() => {
    peopleService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilterElement(event.target.value);
    console.log(filterElement);
  };

  const namesToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filterElement)
      );

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    var sameIndex = false;
    var samePerson = null;
    for (const [key, value] of Object.entries(persons)) {
      if (newName == value.name) {
        samePerson = value;
        sameIndex = true;
        break;
      }
    }

    if (sameIndex) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        peopleService.update(samePerson.id, personObject).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === samePerson.id ? personObject : person
            )
          );
          setNewMessage(`${personObject.name} has been added!`);
          setTimeout(() => {
            setNewMessage(null);
          }, 5000);
        });
      }
      setNewName("");
      setNewNumber("");
    } else {
      peopleService.create(personObject).then((returnedPeople) => {
        setPersons(persons.concat(returnedPeople));
        setNewMessage(`${personObject.name} has been added!`);
        setTimeout(() => {
          setNewMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deleteElement = (id, name) => {
    console.log(id);
    console.log(persons);
    console.log(name);
    if (window.confirm(`Do you want to remove ${name} ?`)) {
      peopleService.deleteElement(id).then(() => {
        console.log(persons);
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch(error => {
        console.log('fail!')
        console.log(error)
        setNewError(
          `Information on ${name} has already been removed from the server`
        )
        setPersons(persons.filter((person) => person.name !== name));

        setTimeout(() => {
          setNewError(null)
        }, 5000)
      })
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} />
      <ErrorNotification message={newError} />
      <Filter
        showAll={showAll}
        setShowAll={setShowAll}
        filterElement={filterElement}
        handleFilterChange={handleFilterChange}
      />

      <h1> add one</h1>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} deleteElement={deleteElement} />
    </div>
  );
};

export default App;
