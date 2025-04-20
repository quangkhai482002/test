import { Box, Button, TextField } from "@mui/material";
import { DocumentEditorContainerComponent } from "@syncfusion/ej2-react-documenteditor";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "../format";
import { fetchReportById, updateReport } from "../services/api";
import "./style.css";

const DetailReport = () => {
  const { id } = useParams();
  const editorObj = useRef<DocumentEditorContainerComponent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const navigate = useNavigate();
  const handleGetReportById = async () => {
    try {
      setIsLoaded(true);
      if (editorObj.current) {
        if (!id) {
          throw new Error("Report ID is undefined");
        }
        const res = await fetchReportById(id);
        console.log("Report data:", res);
        setContent(res.content);
        editorObj.current.documentEditor.open(res.content);
        setName(res.name);
      }
    } catch (error) {
      console.error("Error creating report:", error);
    } finally {
      setIsLoaded(false);
    }
  };
  useEffect(() => {
    handleGetReportById();
  }, []);
  const handleUpdateReport = async () => {
    try {
      setIsLoaded(true);
      if (editorObj.current) {
        const editor = editorObj.current.documentEditor.serialize();
        setContent(editor);
        const reportData = {
          name,
          content,
          image: imgUrl,
        };
        console.log("Report data:", reportData);
        await updateReport(id!, reportData);
      }
    } catch (error) {
      console.error("Error creating report:", error);
    } finally {
      setIsLoaded(false);
    }
  };
  const ContentChange = () => {
    if (!editorObj.current) return;
    setContent(editorObj?.current?.documentEditor.serialize());
    setImgUrl(editorObj.current?.documentEditor?.exportAsImage(1, "Png").src);
    console.log("Updated SFDT:", content);
  };
  const handleDocumentChange = () => {
    if (editorObj.current) {
      const newContent = editorObj.current.documentEditor.serialize();
      setContent(newContent);
      setTimeout(() => {
        try {
          if (!editorObj.current) return;
          const pageCount = editorObj.current.documentEditor.pageCount;
          if (pageCount > 0) {
            const imageSrc = editorObj.current.documentEditor.exportAsImage(
              1,
              "Png"
            ).src;
            setImgUrl(imageSrc);
            console.log("Image updated:", imageSrc);
          } else {
            console.warn("No valid content to export as image.");
            setImgUrl("");
          }
        } catch (error) {
          console.error("Error exporting image:", error);
        }
      }, 300);
      // setImgUrl(editorObj.current.documentEditor.exportAsImage(1, "Png").src);
      console.log("Document changed, updated SFDT:", newContent);
    }
  };
  const insertTableWithData = () => {
    if (editorObj.current) {
      editorObj.current.documentEditor.open(JSON.stringify(data));
    }
  };
  return (
    <Box marginTop={8}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={insertTableWithData}
          disabled={isLoaded}
        >
          {isLoaded ? "Inserting..." : "Insert Table"}
        </Button>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={() => handleUpdateReport()}
          disabled={isLoaded}
        >
          Update
        </Button>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
      </Box>
      <Box display="flex" gap={2} marginBottom={2}>
        <TextField
          variant="outlined"
          type="text"
          placeholder="Report Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <DocumentEditorContainerComponent
        ref={editorObj}
        height="100vh"
        width="100%"
        enableToolbar={true}
        contentChange={ContentChange}
        // documentChange={handleDocumentChange}
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
      ></DocumentEditorContainerComponent>
    </Box>
  );
};

export default DetailReport;
