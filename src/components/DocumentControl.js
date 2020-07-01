import React from 'react';
import QuestionsControl from './QuestionsControl.js';

import Util from './Util.js';

export default class DocumentControl extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      document: {
        title: "Multiplication",
        questions: []
      }
    };

    this.getDocument = this.getDocument.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
  }

  getDocument() {
    return this.state.document;
  }

  updateTitle( title ){
    let newDocument = Util.cloneObject( this.state.document );
    newDocument.title = title;
    this.setState({ document: newDocument }, () => { this.props.updateDocument(newDocument); });
  }

  updateQuestions( questions ){
    let newDocument = Util.cloneObject( this.state.document );
    newDocument.questions = questions;
    this.setState({ document: newDocument }, () => { this.props.updateDocument(newDocument); });
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
          <QuestionsControl document={this.state.document}
                            updateTitle={ this.updateTitle }
                            updateQuestions={ this.updateQuestions }/>
        </section>
      </div>
    );
  }
}
