import React,{useState} from 'react';
import axios from 'axios';
import Gallery from './components/Gallery';
import './App.css'

const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";
const App = () => {
  const [search,setSearch] = useState("");
  const [data,setData] = useState([]);
  const changeHandler = e => {
    setSearch(e.target.value);
  }
  const submitHandler = e => {
    e.preventDefault();
    axios
    .get(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`
    )
    .then(response => {
      setData(response.data.photos.photo)
    })
    .catch(error => {
      console.log(
        "Encountered an error with fetching and parsing data",
        error
      );
  })
  }

  return (
    <div>
      <center>
        <h1>Search Your Fav Photos</h1>
        <form onSubmit={submitHandler}>
          <input type="text" value={search} onChange={changeHandler}/><br/><br/>
          <input type="Submit" name="Search" className='button'/>
        </form>
        <br/>
        {data.length>=1? <Gallery data={data}/> : <h3>No Images Found</h3>  }
      </center>
    </div>
  )
}

export default App
