import axios from "axios";

interface TransformedTableData {
    Name: string;
    Age: string;
    "Phone number": string;
    Email: string;
    Date: string;
    Id: string;
  }
export  const fetchData = async () => {
    const res = await axios.get(
      "https://675e7ce663b05ed0797a446e.mockapi.io/account"
    );
    return res.data;
  };