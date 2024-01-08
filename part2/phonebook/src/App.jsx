import { useState } from "react";

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

const Persons = (props) => {
  const { namesToShow } = props;
  return (
    <>
      <ul>
        {namesToShow.map((person) => (
          <p key={person.name}>
            {" "}
            {person.name} {person.number}
          </p>
        ))}
      </ul>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newID, setNewID] = useState(persons.length + 1);
  const [filterElement, setFilterElement] = useState("");
  const [showAll, setShowAll] = useState(true);

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
      id: newID,
    };
    var sameIndex = false;
    for (const [key, value] of Object.entries(persons)) {
      console.log(value.name);
      console.log(key);
      if (newName == value.name) {
        console.log(value);
        sameIndex = true;
        break;
      }
    }

    if (sameIndex) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      setPersons(persons.concat(personObject));
      setNewID(newID + 1);
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

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
      <Persons namesToShow={namesToShow} />
    </div>
  );
};

export default App;
