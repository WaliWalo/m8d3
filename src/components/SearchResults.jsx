import React, { Component } from "react";
import { Accordion, Button, Card, Spinner, Toast } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getJobById } from "../api/api";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  addToFavourites: (id) =>
    dispatch({
      type: "ADD_TO_FAVOURITES",
      payload: id,
    }),
  addToSelectedJob: (id) =>
    dispatch({
      type: "SET_SELECTED_JOB",
      payload: id,
    }),
});

class SearchResults extends Component {
  state = { showToast: false, latestFav: null };

  toggleShowToast = () => {
    this.setState({ showToast: !this.state.showToast });
  };

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.favourites.length !== this.props.favourites.length) {
      this.setState({ showToast: true }, () => {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(
          () => this.setState({ showToast: false }),
          2500
        );
      });
    }
  }

  getLastFav = async (id) => {
    let job = await getJobById(id);
    this.setState({ lastFav: job });
  };

  render() {
    return (
      <div className="mt-3 mb-2">
        {this.props.results.length > 0 ? (
          <>
            <Toast
              style={{ position: "absolute", top: 15, right: 15 }}
              show={this.state.showToast}
              onClose={this.toggleShowToast}
            >
              <Toast.Header>
                <strong>
                  {this.state.lastFav && this.state.lastFav.title}
                </strong>
                <span> added to favourites</span>
              </Toast.Header>
            </Toast>
            <Accordion defaultActiveKey="0">
              {this.props.results.map((result, index) => {
                return (
                  <>
                    <Card key={index}>
                      <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
                        <img
                          src={result.company_logo}
                          alt="company logo"
                          className="companyLogo"
                        ></img>
                        {result.title}
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={index + 1}>
                        <Card.Body>
                          <p>Type: {result.type}</p>
                          <p>
                            Url:{" "}
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={result.url}
                            >
                              {result.url}
                            </a>
                          </p>
                          <p>Created At: {result.created_at}</p>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={result.company_url}
                          >
                            <p>Company: {result.company}</p>
                          </a>
                          <p>Location: {result.location}</p>
                          <Button
                            onClick={() => {
                              this.props.addToSelectedJob(result.id);
                              return this.props.history.push("/jobDetails");
                            }}
                          >
                            More Details
                          </Button>
                          {this.props.user.username ? (
                            <>
                              {!this.props.favourites.includes(result.id) && (
                                <Button
                                  className="ml-3"
                                  onClick={() => {
                                    this.props.addToFavourites(result.id);
                                    this.getLastFav(result.id);
                                  }}
                                >
                                  Add To Favourites
                                </Button>
                              )}
                            </>
                          ) : (
                            <p>
                              <u>Login to add to favourites</u>
                            </p>
                          )}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </>
                );
              })}
            </Accordion>
            {/* <Button className="mr-3">Back</Button>
            <Button>Next</Button> */}
          </>
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </div>
    );
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchResults)
);
