import React from 'react';
import ToyCard from './ToyCard'


const ToyContainer = (props) => {
  return (
    <div id="toy-collection">
    {props.toys.map((toy, index) => <ToyCard toy={toy} key={index} increaseLike={props.increaseLike} deleteToy={props.deleteToy}/>)}
    </div>
  );
}

export default ToyContainer;
