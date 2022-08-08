import React, { useState }  from "react";
import { useEffect } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import AddProperty from "./Property";
import CreateArea from "./CreateArea";

 function App() {
  var [Properties, setProperties] = useState([]);

  function load(){
    fetch('http://localhost:5000/properties')
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    setProperties(data);
  });
  }
  useEffect(()=> {
    load();
  },[]);

 async function Addproperty(Property) {
    await fetch('http://localhost:5000/properties', {
      method: 'POST',
     headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },    
      body: new URLSearchParams({
        name: Property.name,
        description: Property.description,
        size: Property.size
      })
  });
  
  load();
  }
 async function deleteProperty(id) {
  console.log(id);
    await fetch(`http://localhost:5000/property/${id}`, {
      method: 'DELETE'
    });

 load()
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={Addproperty} />
      {Properties.map((property, index) => {
        return (
          <AddProperty
            key={property._id}
            id={property._id}
            name={property.name}
            description={property.description}
            size={property.size}
            onclicked={deleteProperty}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
