import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Report from "./report";
import CreateReport from "./report/CreateReport";
import DetailReport from "./report/DetailReport";
import LineChart from "./chart/Chart";
import BubbleChart from "./chart/BubbleChart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Report />}></Route>
        <Route path="/create" element={<CreateReport />}></Route>
        <Route path="/edit/:id" element={<DetailReport />}></Route>
        <Route path="/chart" element={<LineChart />}></Route>
        <Route path="/bubblechart" element={<BubbleChart />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
