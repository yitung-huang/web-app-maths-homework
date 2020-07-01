import React from 'react';

export default class Display extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    if (this.props.document.questions){
      return (
        <section className="section__display">
          <div className="page">
            <h1 className="page__title">{ this.props.document.title }</h1>
            <div className="page__section">
              { this.props.document.questions.map(( question_array ) => {
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
    } else {
      return null;
    }

  }
}
