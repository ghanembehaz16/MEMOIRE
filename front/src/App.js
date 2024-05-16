import Axios from "axios";
import React, { useEffect, useState } from 'react';
import './App.css';


function App() {




    

    const handleSubmit = (event) => {

    
      event.preventDefault();

      const Lieu = event.target.elements.Lieu.value;
      const Date = event.target.elements.Date.value;
      const temp = event.target.elements.temp.value;
      const vent = event.target.elements.vent.value;
      const precipitation = event.target.elements.precipitation.value;
      const humidite = event.target.elements.humidite.value;
      const icon = event.target.elements.icon.value;

    const formData = {
      Lieu,
      Date,
      temp,
      vent,
      precipitation,
      humidite,
      icon
    };


      handlePost(formData);
      event.target.reset();
    };
    
    const [react, setReact] = useState([]);

  const fetchData = () => {
      Axios.get('http://127.0.0.1:8000/react/')
      .then(response => {
        console.log(response.data);
          setReact(response.data);
          
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
      fetchData();
  }, []);

  const handlePost = (formData) => {
    Axios.post('http://127.0.0.1:8000/react/', formData)
      .then(() => {
        fetchData();
      })
      .catch(error => {
        console.error('Error submitting data:', error);
        alert("Failed to add forecast");
      });
    };
  



  

  const deleteDep = (stuid) => {
      if (window.confirm('Are you sure ?')) {
        Axios.delete(`http://127.0.0.1:8000/react/${stuid}`)
        .then(() => {
          fetchData();
        })
        .catch(error => {
          console.error('Error deleting data:', error);
          alert("Failed to delete forecast");
        });
      }
  };

  const rows = react.map(stu => (
      <tr key={stu.id}>
          <td>{stu.Lieu}</td>
          <td>{stu.Date}</td>
          <td>{stu.temp}</td>
          <td>{stu.vent}</td>
          <td>{stu.precepitation}</td>
          <td>{stu.humidite}</td>
          <td>{stu.icon}</td>
          <td>
              
              <button onClick={() => deleteDep(stu.id)}>Delete</button>
          </td>
      </tr>
  ));

    

    

  return (
    <div className="weather-forecast">
      <h1 className="title">Prévision Météo</h1>
      <div className="content">
        <div className="container">
        <form className="form" method='POST' action='http://localhost:8000/react/' onSubmit={handleSubmit}>
            <h2 className="form-title">Ajouter une prévision</h2>
            <input type="text" className="input" id="Lieu" placeholder="Lieu" required name="Lieu" />
            <br />
            <input type="date" className="input" id="Date" placeholder="Date" required name="Date" />
            <br />
            <input type="text" className="input" id="temp" placeholder="Température" required  name="temp"/>
            <br />
            <input type="text" className="input" id="vent" placeholder="Vent" required name="vent"/>
            <br />
            <input type="text" className="input" id="precipitation" placeholder="Précipitation" required  name="precipitation"/>
            <br />
            <input type="text" className="input" id="humidite" placeholder="Humidité"  required name="humidite"/>
            <br />
            <select id="icon" className="input" required name="icon">
              <option value="">Sélectionner une icône</option>
              <option value="sunny">Ensoleillé</option>
              <option value="cloudy">Nuageux</option>
              <option value="rainy">Pluvieux</option>
            </select>
            <br />
            <input type="submit" className="button" value="Ajouter"  name="btn"/>
            
            <br />
          </form>

        </div>
        <div className="table-container">
          <h1>Prévisions météo</h1>
          <table id="dataTable">
            <thead>
              <tr>
                <th>Lieu</th>
                <th>Date</th>
                <th>Température</th>
                <th>Vent</th>
                <th>Précipitation</th>
                <th>Humidité</th>
                <th>Icon</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
