import React from 'react';
import QuestionsControl from './QuestionsControl.js';

export default class DocumentControl extends React.Component {
  constructor(props){
    super(props);
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
                            updateTitle={ this.props.updateTitle }
                            updateNumQuestions={ this.props.updateNumQuestions }
                            updateNumColumns={ this.props.updateNumColumns }/>
        </section>
      </div>
    );
  }
}
