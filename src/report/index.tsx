import { Box, Button } from "@mui/material";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  DocumentEditor,
} from "@syncfusion/ej2-react-documenteditor";
// import FileSaver from "file-saver";
import { useEffect, useRef, useState } from "react";
// import ChartModal from "../components/ChartModal";
import "./style.css";

DocumentEditorContainerComponent.Inject(Toolbar);

const Report = () => {
  const editorObj = useRef<DocumentEditorContainerComponent | null>(null);

  useEffect(() => {
    if (editorObj.current) {
      editorObj.current.documentEditor.isReadOnly = false;
      editorObj.current.documentEditor.enableSfdtExport = false;
    }
  }, []);

  // const tableData = [
  //   ["Name", "Age", "City"],
  //   ["John", "25", "New York"],
  //   ["Jane", "30", "London"],
  //   ["Jane", "30", "London"],
  // ];
  const tableData = [
    {
      name: "a",
      age: "8",
      phone: "123456",
      abc: "abc",
      xyz: "xyz",
      pqr: "pqr",
    },
    { name: "b", age: "9", phone: "13579", abc: "abc", xyz: "xyz", pqr: "pqr" },
    {
      name: "c",
      age: "10",
      phone: "246810",
      abc: "abc",
      xyz: "xyz",
      pqr: "pqr",
    },
    {
      name: "c",
      age: "10",
      phone: "246810",
      abc: "abc",
      xyz: "xyz",
      pqr: "pqr",
    },
    {
      name: "c",
      age: "10",
      phone: "246810",
      abc: "abc",
      xyz: "xyz",
      pqr: "pqr",
    },
  ];
  // const insertTableWithData = () => {
  //   if (editorObj.current) {
  //     const editor = editorObj.current.documentEditor.editor;
  //     const rowCount = tableData.length;
  //     const columnCount = tableData[0].length;
  //     editor.insertTable(rowCount, columnCount);

  //     // Insert data into the table cells
  //     for (let i = 0; i < tableData.length; i++) {
  //       for (let j = 0; j < tableData[i].length; j++) {
  //         // Insert text into the current cell
  //         editor.insertText(tableData[i][j]);

  //         // Move cursor to the next cell (right) if not the last column
  //         if (j < tableData[i].length - 1) {
  //           moveCursorToNextCell();
  //         }
  //       }
  //       // Move cursor to the next row if not the last row
  //       if (i < tableData.length - 1) {
  //         moveCursorToNextRow();
  //       }
  //     }
  //   }
  // };

  // Function to move cursor to the next cell
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
