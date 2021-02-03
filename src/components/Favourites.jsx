import React, { Component } from "react";
import { Accordion, Button, Card, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getJobById } from "../api/api.js";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  addToSelectedJob: (id) =>
    dispatch({
      type: "SET_SELECTED_JOB",
      payload: id,
    }),
  removeFromFavourites: (id) =>
    dispatch({
      type: "REMOVE_FROM_FAVOURITES",
      payload: id,
    }),
  addToErrors: (errorMsg) =>
    dispatch({
      type: "ADD_TO_ERRORS",
      payload: errorMsg,
    }),
});

class Favourites extends Component {
  state = {
    favourites: [],
  };

  componentDidMount() {
    this.props.favourites.length > 0 && this.fetchJob();
  }

  componentDidUpdate(prevProps) {
    if (this.props.favourites !== prevProps.favourites) {
      this.setState({ favourites: [] });
      this.fetchJob();
    }
  }

  fetchJob = async () => {
    this.props.favourites.forEach(async (favourite) => {
      let job = await getJobById(favourite);

      if (job.hasOwnProperty("ok")) {
        console.log(job);
        const errorMsg = job.status + job.statusText;
        this.props.addToErrors(errorMsg);
      } else {
        let newFav = [...this.state.favourites];
        newFav.push(job);
        this.setState({ favourites: newFav });
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.favourites.length > 0 && this.props.user ? (
          <>
            <Accordion defaultActiveKey="0">
              {this.state.favourites.map((favourite, index) => {
                return (
                  <Card key={index}>
                    <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
                      <img
                        src={favourite.company_logo}
                        alt="company logo"
                        className="companyLogo"
                      ></img>
                      {favourite.title}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index + 1}>
                      <Card.Body>
                        <p>Type: {favourite.type}</p>
                        <p>
                          Url:{" "}
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={favourite.url}
                          >
                            {favourite.url}
                          </a>
                        </p>
                        <p>Created At: {favourite.created_at}</p>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={favourite.company_url}
                        >
                          <p>Company: {favourite.company}</p>
                        </a>
                        <p>Location: {favourite.location}</p>
                        <Button
                          onClick={() => {
                            this.props.addToSelectedJob(favourite.id);
                            return this.props.history.push("/jobDetails");
                          }}
                        >
                          More Details
                        </Button>
                        {this.props.user.username ? (
                          <>
                            <Button
                              className="ml-3"
                              onClick={() =>
                                this.props.removeFromFavourites(favourite.id)
                              }
                            >
                              Remove from favourite
                            </Button>
                          </>
                        ) : (
                          <p>
                            <u>Login to Remove from favourite</u>
                          </p>
                        )}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                );
              })}
            </Accordion>
            {/* <Button className="mr-3">Back</Button>
          <Button>Next</Button> */}
          </>
        ) : (
          <>
            <span style={{ color: "white" }}>Login/Add favourite</span>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Favourites)
);
