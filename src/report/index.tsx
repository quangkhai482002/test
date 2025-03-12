import { Box, Button } from "@mui/material";
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import { useEffect, useRef } from "react";
import FileSaver from "file-saver";
import "./style.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
// import Header from "../components/Header";
DocumentEditorContainerComponent.Inject(Toolbar);
const Report = () => {
  const data = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
  ];
  const editorObj = useRef<DocumentEditorContainerComponent | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (editorObj.current) {
      editorObj.current.documentEditor.isReadOnly = false;
    }
  }, []);
  const insertChartIntoDocument = async () => {
    if (!editorObj.current || !chartRef.current) return;

    // Convert chart to an image
    const chartElement = chartRef.current;
    const canvas = await html2canvas(chartElement);
    const imageData = canvas.toDataURL("image/png");

    // Insert the image into the Document Editor
    const editor = editorObj.current.documentEditor;
    editor.editor.insertImage(imageData);
  };
  const onSaveAsHTML = () => {
    if (editorObj.current) {
      const htmlContent = editorObj.current.documentEditor.serialize();
      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
      FileSaver.saveAs(blob, "document.html");
    }
  };
  const onSave = () => {
    editorObj.current?.documentEditor.save("sample", "Docx");
  };
  return (
    <>
      {/* <Header onSave={onSave} /> */}
      <Box marginTop={8}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{
              m: 1,
            }}
            onClick={onSave}
          >
            Save
          </Button>
          <Button variant="contained" onClick={onSaveAsHTML}>
            Download as HTML
          </Button>
          <Button
            variant="contained"
            sx={{
              m: 1,
            }}
            onClick={insertChartIntoDocument}
          >
            Insert Chart into Document
          </Button>
        </Box>
        <DocumentEditorContainerComponent
          ref={editorObj}
          height="100vh"
          width="100%"
          enableToolbar={true}
          serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
        ></DocumentEditorContainerComponent>
        <div
          ref={chartRef}
          style={{ width: 400, height: 300, marginBottom: 10 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Box>
    </>
  );
};

export default Report;
