import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, onChange}) => {
  return (
    <form>
        <div>filter shown with <input value={value} onChange={onChange}/></div>
    </form>
  )
}

const PersonForm = ({submitEvent, nameValue, nameChange, numberValue, numberChange}) => {
  return (
    <form onSubmit={submitEvent}>
          <div>name: <input value={nameValue} onChange={nameChange}/></div>
          <div>number: <input value={numberValue} onChange={numberChange}/> </div>
          <div><button type="submit">add</button></div>
    </form>
  )
}

const Person = (props) => {
  return (
    <>
      <p> {props.name} {props.number}</p>
    </>
  )
}

const Persons = ({personList}) => {
  return (
    <div>
      {personList.map(person => 
        < Person key={person.name} name={person.name} number={person.number}/>
      )}
    </div>
  )
}


const App = () => {
  // Initializing states
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  // Fetch names from server
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  // Event handlers
  const addPerson = (event) => {
    event.preventDefault()

    const nameIsInPersons = persons.some(( {name} ) => name === newName)

    // If new name in persons, a warning occurs
    if(nameIsInPersons) {

      alert(`${newName} is already added to phonebook`)

    } else { // If new name not in persons, it is added
      const personObject = {
        name: newName,
        number: newNumber
      }

      // Add to server
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
      })

      const tempPersons = persons.concat(personObject)
      setPersons(tempPersons)
      filterPersons(newFilter, tempPersons)
    }


    // The newName variable is reset in any case
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterPersons = (filterValue, personList) => {
    const tempList = personList.filter( (person) => {
      if(filterValue === '') {
        return true
      }

      return person.name.toLowerCase().includes(filterValue.toLowerCase())
      }
    )

    setFilteredPersons(tempList)
  }

  const handleFilterChange = (event) => {
    const tempFilter = event.target.value
    filterPersons(tempFilter, persons)
    setNewFilter(tempFilter)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm 
        submitEvent={addPerson}
        nameValue={newName} 
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personList={filteredPersons}/>
    </div>
  )
}

export default App