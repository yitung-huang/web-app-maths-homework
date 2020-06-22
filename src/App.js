import React from 'react';
import './App.css';
import './page.css';

import Display from './components/Display.js';
import Sidebar from './components/Sidebar.js';

let NUM_COLUMNS = 2;
let NUM_QUESTIONS = 30;

function cloneObject( object ){
  let newObject = {};
  for (let key in object){
    newObject[ key ] = object[ key ];
  }

  return newObject;
}

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      document: {
        title: "Multiplication",
        columns: NUM_COLUMNS,
        numQuestions: NUM_QUESTIONS
      }
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updateNumQuestions = this.updateNumQuestions.bind(this);
    this.updateNumColumns = this.updateNumColumns.bind(this);
  }

  updateTitle( title ){
    let newDocument = cloneObject( this.state.document );
    newDocument.title = title;
    this.setState({ document: newDocument });
  }

  updateNumQuestions( num_questions ){
    let newDocument = cloneObject( this.state.document );
    newDocument.numQuestions = num_questions;
    this.setState({ document: newDocument }, function(){ console.log("Document is now: ", newDocument)} );
  }

  updateNumColumns( num_columns ){
    let newDocument = cloneObject( this.state.document );
    newDocument.columns = num_columns;
    this.setState({ document: newDocument });
  }

  render(){
    return (
      <div className="App">
        <Sidebar document={ this.state.document }
                 updateTitle={ this.updateTitle }
                 updateNumQuestions={ this.updateNumQuestions }
                 updateNumColumns={ this.updateNumColumns }/>
        <Display document={ this.state.document }/>
      </div>
    );
  }
}
