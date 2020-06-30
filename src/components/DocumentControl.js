import React from 'react';
import QuestionsControl from './QuestionsControl.js';

import Util from './Util.js';

let NUM_COLUMNS = 2;
let NUM_QUESTIONS = 30;

let VALIDATION = {
  "num-questions":
    { "BLANK": true, "NAN": true, "FLOAT": true, "BOUND_INCLUSIVE": {min: 2, max: 30} },
  "num-columns":
    { "BLANK": true, "NAN": true, "FLOAT": true, "BOUND_INCLUSIVE": {min: 2, max: 4} }
};

export default class DocumentControl extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      document: {
        title: "Multiplication",
        columns: NUM_COLUMNS,
        numQuestions: NUM_QUESTIONS
      }
    };

    this.getDocument = this.getDocument.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateNumQuestions = this.updateNumQuestions.bind(this);
    this.updateNumColumns = this.updateNumColumns.bind(this);
  }

  getDocument() {
    return this.state.document;
  }

  updateTitle( title ){
    let newDocument = Util.cloneObject( this.state.document );
    newDocument.title = title;
    this.setState({ document: newDocument }, () => { this.props.updateDocument(newDocument); });
  }

  updateNumQuestions( num_questions ){
    if ( !Util.validateInput( num_questions, VALIDATION["num-questions"] ) ){
      let newDocument = Util.cloneObject( this.state.document );
      newDocument.numQuestions = num_questions;
      this.setState({ document: newDocument }, () => { this.props.updateDocument(newDocument); });
    }
  }

  updateNumColumns( num_columns ){
    if ( !Util.validateInput( num_columns, VALIDATION["num-columns"] ) ){
      let newDocument = Util.cloneObject( this.state.document );
      newDocument.columns = num_columns;
      this.setState({ document: newDocument }, () => { this.props.updateDocument(newDocument); });
    }
  }

  componentDidMount(){
    this.props.updateDocument( this.state.document );
  }

  render() {
    return (
      <div className="sidebar">
        <section className="sidebar__section">
          <h3 className="sidebar__section__title">Topic</h3>
        </section>
        <section className="sidebar__section">
          <h3 className="sidebar__section__title">Page layout</h3>
          <QuestionsControl document={this.props.document}
                            updateTitle={ this.updateTitle }
                            updateNumQuestions={ this.updateNumQuestions }
                            updateNumColumns={ this.updateNumColumns }/>
        </section>
      </div>
    );
  }
}
