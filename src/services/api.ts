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

  export const fetchReport = async () => {
    const res = await axios.get(
      `https://675e7ce663b05ed0797a446e.mockapi.io/report`
    );
    return res.data;
  };
  export const fetchReportById = async (id: string) => {
    const res = await axios.get(
      `https://675e7ce663b05ed0797a446e.mockapi.io/report/${id}`
    );
    return res.data;
  }
  export const createReport = async (data: any) => {
    const res = await axios.post(
      `https://675e7ce663b05ed0797a446e.mockapi.io/report`,
      data
    );
    return res.data;
  }
  export const updateReport = async (id: string, data: any) => {
    const res = await axios.put(
      `https://675e7ce663b05ed0797a446e.mockapi.io/report/${id}`,
      data
    );
    return res.data;
  }
  export const deleteReport = async (id: string) => {
    const res = await axios.delete(
      `https://675e7ce663b05ed0797a446e.mockapi.io/report/${id}`
    );
    return res.data;
  }