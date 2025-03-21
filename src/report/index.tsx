import { Box, Button } from "@mui/material";
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import FileSaver from "file-saver";
import { useEffect, useRef, useState } from "react";
import ChartModal from "../components/ChartModal"; // Import modal component
import "./style.css";

DocumentEditorContainerComponent.Inject(Toolbar);

const Report = () => {
  const editorObj = useRef<DocumentEditorContainerComponent | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (editorObj.current) {
      editorObj.current.documentEditor.isReadOnly = false;
    }
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleInsertImage = (imageData: string) => {
    if (editorObj.current) {
      const editor = editorObj.current.documentEditor;
      editor.editor.insertImage(imageData);
    }
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
          <Button variant="contained" sx={{ m: 1 }} onClick={onSaveAsHTML}>
            Download as HTML
          </Button>
          <Button variant="contained" sx={{ m: 1 }} onClick={handleOpenModal}>
            Open Modal
          </Button>
        </Box>

        {/* Chart Modal */}
        <ChartModal
          open={openModal}
          onClose={handleCloseModal}
          onInsertImage={handleInsertImage}
        />

        {/* Document Editor */}
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
