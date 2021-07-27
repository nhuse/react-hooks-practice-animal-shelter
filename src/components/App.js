import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({type: "all"});

  function onChangeType(type) {
    console.log(type)
    const newObj = {type: type}
    setFilters(newObj)
  }

  useEffect(() => {
    fetch(`http://localhost:3001/pets`)
    .then(resp => resp.json())
    .then(json => setPets(json))
  }, [])

  if(pets.length===0) {
    return (<h1>Loading...</h1>)
  }

  function onFindPetsClick() {
    if(filters.type === "all") {
      fetch(`http://localhost:3001/pets`)
      .then(resp => resp.json())
      .then(json => setPets(json))
    }else {
      fetch(`http://localhost:3001/pets?type=${filters.type}`)
      .then(resp => resp.json())
      .then(json => setPets(json))
    }
  }

  function onAdoptPet(id) {
    pets.map((pet) => {
      if(pet.id === id){
        pet.isAdopted = true;
      }})
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
