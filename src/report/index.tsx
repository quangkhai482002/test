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
} from "recharts";
import html2canvas from "html2canvas";
import Chart from "../components/Chart";

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
    if (!editorObj.current) return;

    // Tạo một div ẩn để chứa biểu đồ
    const hiddenChart = document.createElement("div");
    hiddenChart.style.position = "absolute";
    hiddenChart.style.left = "-9999px"; // Ẩn khỏi giao diện
    hiddenChart.style.width = "400px";
    hiddenChart.style.height = "300px";
    document.body.appendChild(hiddenChart);

    // Render biểu đồ vào div ẩn
    const chart = <Chart />;

    // Dùng ReactDOM để render biểu đồ vào div ẩn
    import("react-dom/client").then((ReactDOM) => {
      const root = ReactDOM.createRoot(hiddenChart);
      root.render(chart);

      // Chờ một chút để biểu đồ render
      setTimeout(async () => {
        const canvas = await html2canvas(hiddenChart);
        const imageData = canvas.toDataURL("image/png");

        // Chèn ảnh vào tài liệu
        const editor = editorObj.current!.documentEditor;
        editor.editor.insertImage(imageData);

        // Xóa div ẩn sau khi chụp ảnh xong
        document.body.removeChild(hiddenChart);
      }, 500);
    });
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
      <Box marginTop={8}>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" sx={{ m: 1 }} onClick={onSave}>
            Save
          </Button>
          <Button variant="contained" onClick={onSaveAsHTML}>
            Download as HTML
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1 }}
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
      </Box>
    </>
  );
};

export default Report;
