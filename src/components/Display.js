import React from 'react';

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



export default class Display extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      questions: generateQuestions( this.props.document.columns, this.props.document.numQuestions),
      extensions: generateExtensions( this.props.document.columns, NUM_EXTENSIONS )
    };

    this.prepareQuestions = this.prepareQuestions.bind(this);
  }

  componentDidUpdate(){
    let NUM_QUESTIONS = getNumElements( this.state.questions );
    if ( this.state.questions.length != this.props.document.columns || NUM_QUESTIONS != this.props.document.numQuestions ){
      this.prepareQuestions();
    }
  }

  prepareQuestions(){
    this.setState({
      questions: generateQuestions( this.props.document.columns, this.props.document.numQuestions),
      extensions: generateExtensions( this.props.document.columns, NUM_EXTENSIONS )
    });
  }

  render() {
    return (
      <section className="section__display">
        <div className="page">
          <h1 className="page__title">{ this.props.document.title }</h1>
          <div className="page__section">
            { this.state.questions.map(( question_array ) => {
              return (
                <div className="page__column">
                {
                  question_array.map((question_str) => {
                    return <p>{question_str}</p>;
                  })
                }
                </div>
              );
            })}
          </div>
          <hr />

          <div className="page__section">
          { this.state.extensions.map(( question_array ) => {
            return (
              <div className="page__column">
              {
                question_array.map((question_str) => {
                  return <p>{question_str}</p>;
                })
              }
              </div>
            );
          })}
          </div>
        </div>
      </section>
    );
  }
}
