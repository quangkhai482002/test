import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Report from "./report";
import CreateReport from "./report/CreateReport";
import DetailReport from "./report/DetailReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Report />}></Route>
        <Route path="/create" element={<CreateReport />}></Route>
        <Route path="/edit/:id" element={<DetailReport />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
