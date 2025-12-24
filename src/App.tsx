import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Report from "./report";
import CreateReport from "./report/CreateReport";
import DetailReport from "./report/DetailReport";
import LineChart from "./chart/Chart";
import BubbleChart from "./chart/BubbleChart";
import LesMiserablesGraph from "./chart/graph";
import TableSelect from "./tableSeclect/table-select";
import DateScanList from "./calender/Calender";
import GraphComponent from "./graph/Graph";
import ChipInput from "./Chipinput";
import CopyResult from "./CopyButton";
import AutoGridCards from "./CardHL";
import PackeryLayout from "./PackeryCard";
import CheckboxWithUrl from "./CheckBoxOption";
import PostsWithScroll from "./PostsWithScroll";
import BasicFlow from "./react-flow/ReactFlow";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Report />}></Route>
          <Route path="/create" element={<CreateReport />}></Route>
          <Route path="/edit/:id" element={<DetailReport />}></Route>
          <Route path="/chart" element={<LineChart />}></Route>
          <Route path="/bubblechart" element={<BubbleChart />}></Route>
          <Route path="/graph" element={<LesMiserablesGraph />}></Route>
          <Route path="/table" element={<TableSelect />}></Route>
          <Route path="/calendar" element={<DateScanList />}></Route>
          <Route path="/network-graph" element={<GraphComponent />}></Route>
          <Route path="/chip-input" element={<ChipInput />}></Route>
          <Route path="/card" element={<AutoGridCards />}></Route>
          <Route path="/packery" element={<PackeryLayout />}></Route>
          <Route path="/checkbox" element={<CheckboxWithUrl />}></Route>
          <Route path="/react-flow" element={<BasicFlow />}></Route>
          <Route
            path="/posts-with-scroll"
            element={<PostsWithScroll />}
          ></Route>
          <Route
            path="/copy-button"
            element={
              <CopyResult
                data={{
                  name: "",
                  phone: [
                    "11000:150000",
                    "1500000:156899",
                    "11000:150000",
                    "150000:1568999",
                    "11000:150000",
                    "1500000:156899",
                    "11000:150000",
                    "150000:1568999",
                  ],
                  email: "",
                  address: "",
                }}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
