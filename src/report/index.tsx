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
  // const insertTableWithData = () => {
  //   if (editorObj.current && editorObj.current.documentEditor) {
  //     const rowCount = 3;
  //     const columnCount = 3;

  //     const tableData = [
  //       ["Tên", "Tuổi", "Thành phố"],
  //       ["Alice", "25", "New York"],
  //       ["Bob", "30", "London"],
  //     ];

  //     editorObj.current.documentEditor.editor.insertTable(
  //       rowCount,
  //       columnCount
  //     );

  //     for (let row = 0; row < rowCount; row++) {
  //       for (let col = 0; col < columnCount; col++) {
  //         editorObj.current.documentEditor.selection.selectTableCell();
  //         editorObj.current.documentEditor.editor.insertText(
  //           tableData[row][col]
  //         );
  //       }
  //     }
  //   }
  // };

  // const insertTableWithData = () => {
  //   if (editorObj.current) {
  //     const editor = editorObj.current.documentEditor.editor;
  //     const selection = editorObj.current.documentEditor.selection;

  //     // Insert a 3x2 table (3 rows, 2 columns)
  //     editor.insertTable(3, 2);

  //     // Data to insert into the table
  //     const tableData = [
  //       ["Name", "Age"],
  //       ["John", "25"],
  //       ["Jane", "30"],
  //     ];

  //     // Insert data into the table cells
  //     for (let i = 0; i < tableData.length; i++) {
  //       for (let j = 0; j < tableData[i].length; j++) {
  //         // Move cursor to the specific cell (row;column)
  //         selection.select(`${i};${j};0`, `${i};${j};0`);
  //         // Insert text into the current cell
  //         editor.insertText(tableData[i][j]);
  //       }
  //     }
  //   }
  // };
  const insertTableWithData = () => {
    if (editorObj.current) {
      const editor = editorObj.current.documentEditor.editor;

      const tableData = [
        ["Name", "Age", "City"],
        ["John", "25", "New York"],
        ["Jane", "30", "London"],
        ["Jane", "30", "London"],
      ];
      // Insert a 3x2 table (3 rows, 2 columns)
      editor.insertTable(4, 3);

      // Sample data to insert into the table

      // Insert data into the table cells
      for (let i = 0; i < tableData.length; i++) {
        for (let j = 0; j < tableData[i].length; j++) {
          // Insert text into the current cell
          editor.insertText(tableData[i][j]);

          // Move cursor to the next cell (right) if not the last column
          if (j < tableData[i].length - 1) {
            moveCursorToNextCell();
          }
        }
        // Move cursor to the next row if not the last row
        if (i < tableData.length - 1) {
          moveCursorToNextRow();
        }
      }
    }
  };

  // Function to move cursor to the next cell
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

  // Use useEffect to insert the table when the component mounts
  // useEffect(() => {
  //   insertTableWithData();
  // }, []);

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

// useEffect(() => {
//   if (editorObj.current && editorObj.current.documentEditor) {
//     const documentEditor: DocumentEditor = editorObj.current.documentEditor;

//     const rowCount = 4;
//     const columnCount = 3;

//     const tableData = [
//       ["Tên", "Tuổi", "Thành phố"],
//       ["Alice", "30", "New York"],
//       ["Bob", "25", "London"],
//       ["Charlie", "35", "Tokyo"],
//     ];

//     documentEditor.editor.insertTable(rowCount, columnCount);

//     for (let row = 0; row < rowCount; row++) {
//       for (let col = 0; col < columnCount; col++) {
//         documentEditor.selection.selectTableCell();
//         documentEditor.editor.insertText(tableData[row][col]);
//       }
//     }
//   }
// }, []);
