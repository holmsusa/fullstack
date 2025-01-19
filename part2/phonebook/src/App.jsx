import { useState } from 'react'


const Person = (props) => {
  return (
    <>
      <p> {props.name} </p>
    </>
  )
}

const App = () => {
  // Initializing states
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  // Event handlers
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked')

    const nameIsInPersons = persons.some(( {name} ) => name === newName)
    console.log(nameIsInPersons)

    // If new name in persons, a warning occurs
    if(nameIsInPersons) {

      alert(`${newName} is already added to phonebook`)

    } else { // If new name not in persons, it is added
      const personObject = {
        name: newName
      }

      setPersons(persons.concat(personObject))
    }

    // The newName variable is reset in any case
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => 
            <Person key={person.name} name={person.name} />
          )}
        </ul>
    </div>
  )
}

export default App