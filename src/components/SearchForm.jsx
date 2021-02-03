import React, { Component } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

export default class SearchForm extends Component {
  render() {
    return (
      <div className="mt-2">
        <Form inline onSubmit={this.props.onSubmit}>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              style={{ color: "white" }}
              type="checkbox"
              label="Full Time"
              name="full_time"
              checked={this.props.form.full_time}
              onChange={this.props.formChangeHandler}
            />
          </Form.Group>
          <FormControl
            type="text"
            name="position"
            placeholder="Position"
            className="mr-sm-2 ml-2"
            value={this.props.form.position}
            onChange={this.props.formChangeHandler}
          />
          <FormControl
            name="location"
            onChange={this.props.formChangeHandler}
            value={this.props.form.location}
            type="text"
            placeholder="Location"
            className="mr-sm-2"
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
      </div>
    );
  }
}
