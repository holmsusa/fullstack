import { useState } from 'react'


const Person = (props) => {
  return (
    <>
      <p> {props.name} {props.number}</p>
    </>
  )
}

const App = () => {
  // Initializing states
  const initPersons = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]
  const [persons, setPersons] = useState(initPersons )
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(initPersons)

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
    console.log(event.target.value)
    const tempFilter = event.target.value
    filterPersons(tempFilter, persons)
    setNewFilter(tempFilter)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>filter shown with <input value={newFilter} onChange={handleFilterChange}/></div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/> </div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
        <div>
          {filteredPersons.map(person => 
            <Person key={person.name} name={person.name} number={person.number} />
          )}
        </div>
    </div>
  )
}

export default App