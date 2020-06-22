import React from 'react';
import Form from 'react-bootstrap/Form';

export default class Sidebar extends React.Component {
  constructor(props){
    super(props);

    this.updateTitle = this.updateTitle.bind(this);
    this.updateNumQuestions = this.updateNumQuestions.bind(this);
    this.updateNumColumns = this.updateNumColumns.bind(this);
  }

  updateTitle( event ){
    this.props.updateTitle( event.target.value );
  }

  updateNumQuestions( event ){
    this.props.updateNumQuestions( event.target.value );
  }

  updateNumColumns( event ){
    this.props.updateNumColumns( event.target.value );
  }

  render() {
    return (
      <div className="sidebar">
        <section className="sidebar__section">
          <h3 className="sidebar__section__title">Topic</h3>
        </section>
        <section className="sidebar__section">
          <h3 className="sidebar__section__title">Page layout</h3>
          <div className="sidebar__section__content">
            <Form.Group controlId="form__doc__title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter title of document"
                            defaultValue={ this.props.document.title }
                            onChange={ this.updateTitle } />
            </Form.Group>

            <Form.Group controlId="form__doc__num-questions">
              <Form.Label>Number of questions</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter number of questions"
                            defaultValue={ this.props.document.numQuestions }
                            onChange={ this.updateNumQuestions } />
            </Form.Group>

            <Form.Group controlId="form__doc__num-columns">
              <Form.Label>Number of columns</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter number of columns"
                            defaultValue={ this.props.document.columns }
                            onChange={ this.updateNumColumns } />
            </Form.Group>
          </div>
        </section>
      </div>
    );
  }
}
