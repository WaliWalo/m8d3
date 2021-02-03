let url = `${process.env.REACT_APP_API_URL}.json?markdown=false&page=1`;
export async function getJobs(
  location = null,
  description = null,
  full_time = false,
  page = 1
) {
  try {
    if (location) {
      url = `${url}&location=${location}`;
    } else if (description) {
      url = `${url}&description=${description}`;
    } else if (description & location) {
      url = `${url}&description=${description}&location=${location}`;
    }
    if (full_time) {
      url = `${url}&full_time=${full_time}`;
    }
    const response = await fetch(url, { method: "GET", mode: "cors" });
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      let error = await response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

export async function getJobById(id) {
  try {
    url = process.env.REACT_APP_API_URL;
    const response = await fetch(`${url}/${id}.json?markdown=true`);
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      let error = await response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}
