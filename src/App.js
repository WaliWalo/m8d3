import { useEffect, useState } from "react";
import { Container, Toast } from "react-bootstrap";
import { getJobs } from "./api/api";
import "./App.css";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import { Route, Link } from "react-router-dom";
import JobDetails from "./components/JobDetails";
import Favourites from "./components/Favourites";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

function App(props) {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({
    full_time: false,
    position: "",
    location: "",
  });
  const [showToast, setShowToast] = useState(false);

  const toggleShowToast = () => setShowToast(!showToast);

  useEffect(() => {
    fetchResults();
  }, []);

  useEffect(() => {
    toggleShowToast();
  }, [props.errors]);

  const fetchResults = async (form = null) => {
    let jobs = [];
    if (form) {
      jobs = await getJobs(form.location, form.position, form.full_time);
      setResults(jobs);
    } else {
      jobs = await getJobs();
      setResults(jobs.slice(0, 10));
    }
  };

  const formChangeHandler = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setForm({ ...form, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetchResults(form);
    setForm({
      full_time: false,
      position: "",
      location: "",
    });
  };

  return (
    <div className="App">
      {props.errors.length > 0 &&
        props.errors.map((error) => (
          <Toast
            style={{
              position: "absolute",
              top: 15,
              right: 15,
              backgroundColor: "red",
            }}
            show={showToast}
            onClose={toggleShowToast}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        ))}

      <header className="App-header">
        <Container>
          <Link to="/">
            <h1>Home</h1>
          </Link>
          <SearchForm
            onSubmit={onSubmit}
            form={form}
            formChangeHandler={formChangeHandler}
          />
          <Route
            path="/"
            exact
            render={(props) => <SearchResults results={results} />}
          />
          <Route path="/jobDetails" exact render={(props) => <JobDetails />} />
          <Route path="/favourites" exact render={(props) => <Favourites />} />
        </Container>
      </header>
    </div>
  );
}

export default connect(mapStateToProps)(App);
