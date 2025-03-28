import { Box, Button } from "@mui/material";
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import axios from "axios";

DocumentEditorContainerComponent.Inject(Toolbar);
interface TableData {
  name: string;
  age: string;
  phone_number: Array<string>;
  email: number;
  date: Date;
  id: string;
}

interface TransformedTableData {
  Name: string;
  Age: string;
  "Phone number": string;
  Email: string;
  Date: string;
  Id: string;
}

const Report = () => {
  const editorObj = useRef<DocumentEditorContainerComponent | null>(null);
  const [data, setData] = useState<TableData[]>([]);
  const [transformedData, setTransformedData] = useState<
    TransformedTableData[]
  >([]);
  const fetchData = async () => {
    const res = await axios.get(
      "https://675e7ce663b05ed0797a446e.mockapi.io/account"
    );
    setData(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  useEffect(() => {
    const newTransformedData = data.map((item) => ({
      Name: String(item.name),
      Age: String(item.age),
      "Phone number": Array.isArray(item.phone_number)
        ? item.phone_number.join(", ")
        : String(item.phone_number),
      Email: String(item.email),
      Date:
        item.date instanceof Date ? item.date.toISOString() : String(item.date),
      Id: String(item.id),
    }));
    setTransformedData(newTransformedData);
  }, [data]);

  console.log("Original Data:", data);
  console.log("Transformed Data:", transformedData);

  useEffect(() => {
    if (editorObj.current) {
      editorObj.current.documentEditor.isReadOnly = false;
      editorObj.current.documentEditor.enableSfdtExport = false;
    }
  }, []);

  const tableData = [
    { name: "a", age: "8", phone: "123456" },
    { name: "b", age: "9", phone: "13579" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
  ];
  const insertTableWithData = () => {
    if (editorObj.current) {
      const editor = editorObj.current.documentEditor.editor;
      const fields = Object.keys(tableData[0]) as Array<
        keyof (typeof tableData)[0]
      >;

      editor.insertTable(tableData.length + 1, fields.length);

      // Add header row
      fields.forEach((field, index) => {
        editor.insertText(field.charAt(0).toUpperCase() + field.slice(1));
        if (index < fields.length - 1) {
          moveCursorToNextCell();
        }
      });

      // Move to the next row (first data row)
      moveCursorToNextRow();

      // Populate the table with data
      tableData.forEach((item) => {
        fields.forEach((field: keyof typeof item, index) => {
          editor.insertText(item[field]);
          if (index < fields.length - 1) {
            moveCursorToNextCell();
          }
        });
        moveCursorToNextRow();
      });
    }
  };

  const moveCursorToNextCell = () => {
    if (editorObj.current) {
      const selection = editorObj.current.documentEditor.selection;
      const startOffset = selection.startOffset;
      const offsetArray = startOffset.split(";");
      offsetArray[3] = (parseInt(offsetArray[3]) + 1).toString(); // Increment cell index
      const newOffset = offsetArray.join(";");
      selection.select(newOffset, newOffset); // Move cursor to next cell
    }
  };

  // Function to move cursor to the next row (first cell)
  const moveCursorToNextRow = () => {
    if (editorObj.current) {
      const selection = editorObj.current.documentEditor.selection;
      const startOffset = selection.startOffset;
      const offsetArray = startOffset.split(";");
      offsetArray[2] = (parseInt(offsetArray[2]) + 1).toString(); // Increment row index
      offsetArray[3] = "0"; // Reset to first cell in the row
      const newOffset = offsetArray.join(";");
      selection.select(newOffset, newOffset); // Move cursor to next row
    }
  };

  return (
    <>
      <Box marginTop={8}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={insertTableWithData}
          >
            Insert Table
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
