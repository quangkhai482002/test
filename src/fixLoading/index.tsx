import { Box, Button } from "@mui/material";
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import { useEffect, useRef, useState } from "react";
import "../report/style.css";
import html2canvas from "html2canvas";
import Chart from "../components/Chart";
import _ from "lodash"; // Import Lodash

DocumentEditorContainerComponent.Inject(Toolbar);

const FixLoading = () => {
  const editorObj = useRef<DocumentEditorContainerComponent | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editorObj.current) {
      editorObj.current.documentEditor.isReadOnly = false;
      editorObj.current.documentEditor.enableSfdtExport = false;
    }
  }, []);

  const debouncedInsertImage = _.debounce(async () => {
    if (!chartRef.current || !editorObj.current) return;
    console.log("Inserting image...");
    // setIsLoading(true);
    try {
      const canvas = await html2canvas(chartRef.current);
      const imageData = canvas.toDataURL("image/png");
      editorObj.current.documentEditor.editor.insertImage(imageData);
    } catch (error) {
      console.error("Error converting chart to image", error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleInsertImage = () => {
    setIsLoading(true);
    debouncedInsertImage();
  };

  useEffect(() => {
    return () => {
      debouncedInsertImage.cancel(); // Cancel any pending debounced calls
    };
  }, []);

  return (
    <>
      <Box marginTop={8}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={handleInsertImage}
            disabled={isLoading}
          >
            Insert Chart
          </Button>
        </Box>
        <div
          ref={chartRef}
          style={{
            width: 400,
            height: 300,
            margin: "0 auto",
            position: "absolute",
            left: -99999,
          }}
        >
          <Chart />
        </div>

        <DocumentEditorContainerComponent
          ref={editorObj}
          height="100vh"
          width="90%"
          enableToolbar={true}
          serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
        />
      </Box>
    </>
  );
};

export default FixLoading;
