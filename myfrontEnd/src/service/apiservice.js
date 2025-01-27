import errorHandler from "./errorHandler";



export const API_URL = "http://localhost:8000/"

// function to get data from backend
export const fetchData = async (endPoint) => {
  let token = localStorage.getItem("bid");

  try {
    const response = await fetch(`${API_URL}${endPoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();

    if (response.ok) {
      return res;
    }
    if (response.status === 401) {
      throw new Error("Please login to continue");
    }
    
    errorHandler(res);

  } catch (error) {
    console.error(error, "Error fetching data:", error.message);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const modifyData = async (endPoint, data, method = "POST") => {
  // handle post, put, delete requests
  const token = localStorage.getItem("sHule");

  const response = await fetch(`${API_URL}${endPoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();

  if (response.ok) {
    return res;
  }
  if (response.status === 401) {
    //await user.checkTokenAndRefresh;
  }

  errorHandler(res);
};

export const postData = async (endPoint, data) => {
  return modifyData(endPoint, data, "POST");
};


