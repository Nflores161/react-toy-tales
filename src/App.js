import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


const BASE_URL = "http://localhost:3000/toys"

class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  //Increase likes
  componentDidMount() {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(toys => this.setState({ toys: toys}))
  }


// handles state of first display page
  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  //Like incrementor
  increaseLike = (toyPojo) => {
    const newLikes = toyPojo.likes + 1 

    fetch(`${BASE_URL}/${toyPojo.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"
    },
      body: JSON.stringify({
      likes: newLikes
    })
  })
    .then(res => res.json())
    .then(updatedLike => {
      this.componentDidMount()
    })
  }

  //update new toy form on DOM
  createToy = (toyPojo) => {
    this.setState({
      toy: [...this.state.toys, toyPojo]
    })
  }

  //Delete toy from Backend and update Dom

  deleteToy = (toyPojo) => {
    const toyFilter = this.state.toys.filter((toy) => toy.id !== toyPojo.id)
  // Delete from backend
    fetch(`${BASE_URL}/${toyPojo.id}`, {
      method: "DELETE"
    })
      .then(res => res.json)
        .then(() => {

          this.setState({
            toy: toyFilter
          })
        })
  }

  render() {
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createToy={this.createToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} increaseLike={this.increaseLike} deleteToy={this.deleteToy}/>
      </>
    );
  }

}

export default App;
