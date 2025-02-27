import { Box, Button } from "@mui/material";
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import { useRef } from "react";
import Header from "../components/Header";
DocumentEditorContainerComponent.Inject(Toolbar);
const Report = () => {
  const editorObj = useRef<DocumentEditorContainerComponent | null>(null);
  const onSave = () => {
    editorObj.current?.documentEditor.save("sample", "Docx");
  };
  return (
    <>
      <Header onSave={onSave} />
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
          <Button
            variant="contained"
            sx={{
              m: 1,
            }}
            onClick={onSave}
          >
            Download as HTML
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
