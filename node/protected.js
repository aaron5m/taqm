import axios from "axios";
const FASTAPI_URL = process.env.FASTAPI_URL;
const API_SECRET = process.env.API_SECRET;


// VERIFY *Notice *alters database AND is NOT exposed to api
export async function verify(username) {
  try {
    const response = await axios.post(`${FASTAPI_URL}/pyapi/verify`, 
      { username }, 
      { headers: { "X-API-KEY": API_SECRET }}
    );
    console.log({ message: "Successfully verified", fastapi: response.data });
    return true;
  } catch (err) {
    console.log(err);
  }
  return false;
}