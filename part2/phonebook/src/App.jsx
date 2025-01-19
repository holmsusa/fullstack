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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

      setPersons(persons.concat(personObject))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/> </div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
        <div>
          {persons.map(person => 
            <Person key={person.name} name={person.name} number={person.number} />
          )}
        </div>
    </div>
  )
}

export default App