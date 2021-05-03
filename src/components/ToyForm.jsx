import React, { Component } from 'react';

class ToyForm extends Component {


  state = {
    name: " ",
    image: " "
  }

  submitToy = (e) => {
    e.preventDefault();
    // creates toy
    const newToy = {
      name: this.state.name,
      image: this.state.image
    }

  // posts the new toy

  fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(res => res.json())
    .then((newToyObj => {
      this.props.createToy(newToyObj)
      this.setState({
        name:" ",
        image: " "
      })
    }))
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.submitToy} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input value={this.state.image} onChange={(e) => this.setState({image: e.target.value})} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
