import React, { Component } from "react";
import { Card, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { getJobById } from "../api/api";

const mapStateToProps = (state) => state;

// const mapDispatchToProps = (dispatch) => ({
//   getJob: () =>
//     dispatch(async (dispatch, getState) => {
//       console.log(getState().selectedJob);
//       let job = await getJobById(getState().selectedJob);
//       this.setState({ job });
//     }),
// });

class JobDetails extends Component {
  state = { job: null };
  componentDidMount() {
    this.fetchJob();
  }

  fetchJob = async () => {
    let job = await getJobById(this.props.selectedJob);
    this.setState({ job });
  };
  render() {
    return (
      <div className="mt-3">
        {this.state.job ? (
          <>
            <Card>
              <Card.Header>
                <img
                  src={this.state.job.company_logo}
                  alt="company logo"
                  className="companyLogo"
                ></img>
                {this.state.job.title}
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>Type: {this.state.job.type}</p>
                  <p>
                    Url:{" "}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={this.state.job.url}
                    >
                      {this.state.job.url}
                    </a>
                  </p>
                  <p>Created At: {this.state.job.created_at}</p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={this.state.job.company_url}
                  >
                    <p>Company: {this.state.job.company}</p>
                  </a>
                  <p>Location: {this.state.job.location}</p>
                  <p>
                    Description:
                    <span
                      dangerouslySetInnerHTML={{
                        __html: this.state.job.description,
                      }}
                    ></span>
                  </p>
                  <p>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: this.state.job.how_to_apply,
                      }}
                    ></span>
                  </p>
                </blockquote>
              </Card.Body>
            </Card>
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

export default connect(mapStateToProps)(JobDetails);
