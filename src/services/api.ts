import axios from "axios";

export const fetchData = async () => {
    const res = await axios.get(
      "https://675e7ce663b05ed0797a446e.mockapi.io/account"
    );
    return res.data;
  };

  export const fetchImage = async () => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
    return res.data;
  }