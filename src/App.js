import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getJobs } from "./api/api";
import "./App.css";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import { Route, Link } from "react-router-dom";
import JobDetails from "./components/JobDetails";

function App() {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({
    full_time: false,
    position: "",
    location: "",
  });
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

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

  const handleJobSelect = (id) => {
    setSelectedJob(id);
  };

  return (
    <div className="App">
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
            render={(props) => (
              <SearchResults
                handleJobSelect={handleJobSelect}
                results={results}
              />
            )}
          />
          <Route
            path="/jobDetails"
            exact
            render={(props) => <JobDetails selectedJob={selectedJob} />}
          />
          {/* <SearchResults results={results} /> */}
        </Container>
      </header>
    </div>
  );
}

export default App;
