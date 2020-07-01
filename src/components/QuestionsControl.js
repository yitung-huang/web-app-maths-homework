import React from 'react';
import Form from 'react-bootstrap/Form';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Util from './Util.js';

let VALIDATION = {
  "num-questions":
    { "BLANK": true, "NAN": true, "FLOAT": true, "BOUND_INCLUSIVE": {min: 2, max: 30} },
  "num-columns":
    { "BLANK": true, "NAN": true, "FLOAT": true, "BOUND_INCLUSIVE": {min: 2, max: 4} }
};


let MIN = 2;
let MAX = 6;

let NUM_EXTENSIONS = 10;

let EXTENSION_MIN = 7;
let EXTENSION_MAX = 9;

function randInt(min, max){
  let range = max - min;
  return min + Math.round( Math.random() * range );
}

function getNumElements( array2D ){
  let numElements = 0;
  for (let i = 0; i < array2D.length; i++){
    for (let j = 0; j < array2D[i].length; j++){
      numElements++;
    }
  }
  return numElements;
}

function getLayout( NUM_COLUMNS, NUM_QUESTIONS ){
  let NUM_FULL_ROWS = Math.floor(NUM_QUESTIONS / NUM_COLUMNS);
  let LAST_ROW = NUM_QUESTIONS % NUM_COLUMNS;
  let NUM_ROWS = (LAST_ROW == 0)? NUM_FULL_ROWS : NUM_FULL_ROWS + 1;

  return {
    NUM_FULL_ROWS: NUM_FULL_ROWS,
    NUM_ROWS: NUM_ROWS,
    LAST_ROW: LAST_ROW
  };
}

function generateMultiplication( min, max ){
  return randInt( min, max ) + " × " + randInt( min, max ) + " = ";
}

function generateQuestions( NUM_COLUMNS, NUM_QUESTIONS ){
  let questions = [];

  let LAYOUT = getLayout( NUM_COLUMNS, NUM_QUESTIONS);
  let NUM_ROWS = LAYOUT.NUM_ROWS;
  let LAST_ROW = LAYOUT.LAST_ROW;

  for (let i = 0; i < NUM_COLUMNS; i++){
    questions.push([]);

    let NUM_THIS_COLUMN = (i < LAST_ROW || LAST_ROW == 0)? NUM_ROWS : NUM_ROWS - 1;
    for (let j = 0; j < NUM_THIS_COLUMN; j++){
      questions[i].push( generateMultiplication( MIN, MAX ) );
    }
  }

  return questions;
}

function generateExtensions( NUM_COLUMNS, NUM_QUESTIONS ){
  let questions = [];

  let LAYOUT = getLayout( NUM_COLUMNS, NUM_QUESTIONS);
  let NUM_ROWS = LAYOUT.NUM_ROWS;
  let LAST_ROW = LAYOUT.LAST_ROW;

  for (let i = 0; i < NUM_COLUMNS; i++){
    questions.push([]);

    let NUM_THIS_COLUMN = (i < LAST_ROW || LAST_ROW == 0)? NUM_ROWS : NUM_ROWS - 1;
    for (let j = 0; j < NUM_THIS_COLUMN; j++){
      questions[i].push( generateMultiplication( MIN, EXTENSION_MAX ) );
    }
  }

  return questions;
}

const NUM_COLUMNS = 3;
const NUM_QUESTIONS = 30;

export default class QuestionsControl extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      columns: NUM_COLUMNS,
      numQuestions: NUM_QUESTIONS,
      questions: []
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updateNumQuestions = this.updateNumQuestions.bind(this);
    this.updateNumColumns = this.updateNumColumns.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
  }

  updateTitle( event ){
    this.props.updateTitle( event.target.value );
  }

  updateNumQuestions( event ){
    let num_questions = event.target.value;
    if ( !Util.validateInput( num_questions, VALIDATION["num-questions"] ) ){
      this.setState({ numQuestions: num_questions }, this.updateQuestions);
    }
  }

  updateNumColumns( event ){
    let num_columns = event.target.value;
    if ( !Util.validateInput( num_columns, VALIDATION["num-columns"] ) ){
      this.setState({ columns: num_columns }, this.updateQuestions);
    }
  }

  updateQuestions(){
    let questions = generateQuestions( this.state.columns, this.state.numQuestions );

    this.props.updateQuestions( questions );
    this.setState({questions: questions});
  }

  componentDidMount(){
    this.updateQuestions();
  }

  render() {
    return (
      <div className="sidebar__section__content">
        <Form.Group controlId="form__doc__title">
          <Form.Label>Title</Form.Label>
          <Form.Control name="document-title"
                        type="text"
                        placeholder="Enter title of document"
                        defaultValue={ this.props.document.title }
                        onChange={ this.updateTitle } />
        </Form.Group>

        <Form.Group controlId="form__doc__num-questions">
          <Form.Label>Number of questions</Form.Label>
          <Form.Control name="num-questions"
                        type="text"
                        placeholder="Enter number of questions"
                        defaultValue={ this.state.numQuestions }
                        onChange={ this.updateNumQuestions } />
        </Form.Group>

        <Form.Group controlId="form__doc__num-columns">
          <Form.Label>Number of columns</Form.Label>
          <Form.Control name="num-columns"
                        type="text"
                        placeholder="Enter number of columns"
                        defaultValue={ this.state.columns }
                        onChange={ this.updateNumColumns } />
        </Form.Group>
      </div>
    );
  }
}
