import React from 'react';
import Form from 'react-bootstrap/Form';

export default class Sidebar extends React.Component {
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
              <Form.Control type="text" placeholder="Enter title of document" />
            </Form.Group>

            <Form.Group controlId="form__doc__num-questions">
              <Form.Label>Number of questions</Form.Label>
              <Form.Control type="text" placeholder="Enter number of questions" />
            </Form.Group>

            <Form.Group controlId="form__doc__num-columns">
              <Form.Label>Number of columns</Form.Label>
              <Form.Control type="text" placeholder="Enter number of columns" />
            </Form.Group>
          </div>
        </section>
      </div>
    );
  }
}
