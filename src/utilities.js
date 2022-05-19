import axios  from "axios";

export const fetchCodes = async (Data) => {
  try {
      const response = await axios.post("https://api.evius.co/api/code/validatecode",Data);
      return response.data
  }catch (e) {
      return e.response
  }
}