import React from 'react';
import './App.css';
import './page.css';

import Sidebar from './components/Sidebar.js';

let questions = [];

let NUM_COLUMNS = 2;
let NUM_QUESTIONS_PER_COLUMN = 15;

let MIN = 2;
let MAX = 6;

function randInt(min, max){
  let range = max - min;
  return min + Math.round( Math.random() * range );
}

function generateMultiplication( min, max ){
  return randInt( min, max ) + " × " + randInt( min, max ) + " = ";
}

for (let i = 0; i < NUM_COLUMNS; i++){
  questions.push([]);
  for (let j = 0; j < NUM_QUESTIONS_PER_COLUMN; j++){
    questions[i].push( generateMultiplication( MIN, MAX ) );
  }
}

let extensions = [];
let NUM_EXTENSIONS_PER_COLUMN = 5;

let EXTENSION_MIN = 7;
let EXTENSION_MAX = 9;

for (let i = 0; i < NUM_COLUMNS; i++){
  extensions.push([]);
  for (let j = 0; j < NUM_EXTENSIONS_PER_COLUMN; j++){
    extensions[i].push( randInt( EXTENSION_MIN, EXTENSION_MAX) + " × " + randInt( MIN, EXTENSION_MAX ) + " = ");
  }
}

function App() {
  return (
    <div className="App">
      <Sidebar />
      <section>
        <h1>Multiplication</h1>
        <div className="page">
          { questions.map(( question_array ) => {
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
        { extensions.map(( question_array ) => {
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
      </section>
    </div>
  );
}

export default App;
