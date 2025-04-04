import axios from "axios";

const API_KEY = "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov/neo/rest/v1/neo/browse";

export const serviceAsteroids = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { api_key: API_KEY },
    });

    return response.data.near_earth_objects;
  } catch (error) {
    console.error("Error fetching asteroid data:", error);
    return [];
  }
};
