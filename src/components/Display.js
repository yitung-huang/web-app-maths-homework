import React from 'react';

let MIN = 2;
let MAX = 6;

let NUM_EXTENSIONS_PER_COLUMN = 5;

let EXTENSION_MIN = 7;
let EXTENSION_MAX = 9;

function randInt(min, max){
  let range = max - min;
  return min + Math.round( Math.random() * range );
}

function generateMultiplication( min, max ){
  return randInt( min, max ) + " × " + randInt( min, max ) + " = ";
}

function generateQuestions( NUM_COLUMNS, NUM_QUESTIONS_PER_COLUMN){
  let questions = [];
  for (let i = 0; i < NUM_COLUMNS; i++){
    questions.push([]);
    for (let j = 0; j < NUM_QUESTIONS_PER_COLUMN; j++){
      questions[i].push( generateMultiplication( MIN, MAX ) );
    }
  }

  return questions;
}

function generateExtensions( NUM_COLUMNS, NUM_QUESTIONS_PER_COLUMN){
  let extensions = [];
  for (let i = 0; i < NUM_COLUMNS; i++){
    extensions.push([]);
    for (let j = 0; j < NUM_QUESTIONS_PER_COLUMN; j++){
      extensions[i].push( generateMultiplication( EXTENSION_MIN, EXTENSION_MAX ) );
    }
  }

  return extensions;
}



export default class Display extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      questions: generateQuestions( this.props.document.columns, this.props.document.questions_per_col),
      extensions: generateExtensions( this.props.document.columns, NUM_EXTENSIONS_PER_COLUMN )
    };
  }

  componentDidUpdate(){
    if (this.state.questions.length != this.props.document.columns || this.state.questions[0].length != this.props.document.questions_per_col){
      this.setState({
        questions: generateQuestions( this.props.document.columns, this.props.document.questions_per_col),
        extensions: generateExtensions( this.props.document.columns, NUM_EXTENSIONS_PER_COLUMN )
      });
    }
  }

  render() {
    return (
      <section className="section__display">
        <div>
          <h1 className="page__title">{ this.props.document.title }</h1>
          <div className="page">
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

          <div className="page">
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
