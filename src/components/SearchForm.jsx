import React, { Component } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUserName: (username) =>
    dispatch({ type: "SET_USERNAME", payload: username }),
});

class SearchForm extends Component {
  state = {
    showModal: false,
    username: null,
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
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
          <div style={{ marginLeft: "auto" }}>
            {this.props.user && this.props.user.username ? (
              <>
                <span className="mr-2" style={{ color: "white" }}>
                  Welcome, <strong>{this.props.user.username}</strong>
                </span>
                <Button
                  color="primary"
                  onClick={() => this.props.history.push("/favourites")}
                >
                  Favourites ({this.props.favourites.length})
                </Button>
              </>
            ) : (
              <Button
                color="primary"
                onClick={() => this.setState({ showModal: true })}
              >
                Login
              </Button>
            )}
          </div>
        </Form>

        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mt-3">
              <FormControl
                aria-label="user"
                onChange={(e) =>
                  this.setState({ username: e.currentTarget.value })
                }
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.props.setUserName(this.state.username);
                this.toggleModal();
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchForm)
);
