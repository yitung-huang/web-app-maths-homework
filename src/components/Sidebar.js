import React from 'react';
import DocumentControl from './DocumentControl.js';

export default class Sidebar extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        <DocumentControl document={ this.props.document }
                         updateTitle={ this.props.updateTitle }
                         updateNumQuestions={ this.props.updateNumQuestions }
                         updateNumColumns={ this.props.updateNumColumns }/>
      </div>
    );
  }
}
