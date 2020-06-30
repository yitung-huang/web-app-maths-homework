import React from 'react';
import DocumentControl from './DocumentControl.js';

export default class Sidebar extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        <DocumentControl ref="DocumentControl"
                         document={ this.props.document }
                         updateDocument={ this.props.updateDocument } />
      </div>
    );
  }
}
