import React, { Component } from "react";
import { Accordion, Button, Card, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
class SearchResults extends Component {
  render() {
    return (
      <div className="mt-3 mb-2">
        {this.props.results.length > 0 ? (
          <>
            <Accordion defaultActiveKey="0">
              {this.props.results.map((result, index) => {
                return (
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
                          <a target="_blank" rel="noreferrer" href={result.url}>
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
                            let handleJobSelect = this.props.handleJobSelect;
                            handleJobSelect(result.id);
                            return this.props.history.push("/jobDetails");
                          }}
                        >
                          More Details
                        </Button>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                );
              })}
            </Accordion>
            <Button className="mr-3">Back</Button>
            <Button>Next</Button>
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
export default withRouter(SearchResults);
