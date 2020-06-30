import React from 'react';
import './App.css';
import './page.css';

import Display from './components/Display.js';
import Sidebar from './components/Sidebar.js';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      document: {}
    };

    this.updateDocument = this.updateDocument.bind(this);
  }

  updateDocument( document ){
    this.setState({ document: document });
  }

  render(){
    return (
      <div className="App">
        <Sidebar document={ this.state.document }
                 updateDocument={ this.updateDocument }/>
        <Display document={ this.state.document }/>
      </div>
    );
  }
}
