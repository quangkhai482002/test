import { Box, Button } from "@mui/material";
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import { data } from "../format";

DocumentEditorContainerComponent.Inject(Toolbar);

const Report = () => {
  const editorObj = useRef<DocumentEditorContainerComponent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (editorObj.current) {
      editorObj.current.documentEditor.open(JSON.stringify(data));
    }
  }, []);

  const tableData = [
    { name: "a", age: "8", phone: "123456" },
    { name: "b", age: "9", phone: "13579" },
    { name: "c", age: "10", phone: "246810" },
    { name: "a", age: "8", phone: "123456" },
    { name: "b", age: "9", phone: "13579" },
    { name: "c", age: "10", phone: "246810" },
    { name: "a", age: "8", phone: "123456" },
    { name: "b", age: "9", phone: "13579" },
    { name: "c", age: "10", phone: "246810" },
    { name: "a", age: "8", phone: "123456" },
    { name: "b", age: "9", phone: "13579" },
    { name: "c", age: "10", phone: "246810" },
  ];
  const ContentChange = () => {
    setContent(editorObj.current?.documentEditor.serialize() || "");
    console.log("Updated SFDT:", content);
  };
  const insertTableWithData = () => {
    try {
      setIsLoaded(true);
      if (editorObj.current) {
        const editor = editorObj.current.documentEditor.editor;
        const selection = editorObj.current.documentEditor.selection;
        const fields = Object.keys(tableData[0]) as Array<
          keyof (typeof tableData)[0]
        >;
        // const rowCount = tableData.length + 1; // +1 for header
        // const colCount = fields.length;
        editor.insertTable(tableData.length + 1, fields.length);

        // Add header row
        fields.forEach((field, index) => {
          editor.toggleBold();
          selection.cellFormat.background = "#d9d9d9"; // Set header background color
          editor.insertText(field.charAt(0).toUpperCase() + field.slice(1));
          if (index < fields.length - 1) {
            moveCursorToNextCell();
          }
        });

        // Move to the next row (first data row)
        moveCursorToNextRow();

        // Populate the table with data
        tableData.forEach((item, cellIndex) => {
          fields.forEach((field: keyof typeof item, index) => {
            if (cellIndex % 2 !== 0) {
              selection.cellFormat.background = "#fcba03";
            }
            editor.insertText(item[field]);
            if (index < fields.length - 1) {
              moveCursorToNextCell();
            }
          });
          moveCursorToNextRow();
        });
      }
    } catch (error) {
      console.error("Error inserting table:", error);
    } finally {
      setIsLoaded(false);
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
            disabled={isLoaded}
          >
            {isLoaded ? "Inserting..." : "Insert Table"}
          </Button>
        </Box>

        <DocumentEditorContainerComponent
          ref={editorObj}
          height="100vh"
          width="100%"
          enableToolbar={true}
          contentChange={ContentChange}
          serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
        ></DocumentEditorContainerComponent>
      </Box>
    </>
  );
};

export default Report;

// const sfdt = {
//   sections: [
//     {
//       blocks: [
//         {
//           rows: Array.from({ length: rowCount }, (_, rowIndex) => ({
//             rowFormat: {},
//             cells: Array.from({ length: colCount }, (_, colIndex) => {
//               const text =
//                 rowIndex === 0
//                   ? fields[colIndex].charAt(0).toUpperCase() +
//                     fields[colIndex].slice(1) // Header
//                   : tableData[rowIndex - 1][fields[colIndex]]; // Data
//               return {
//                 blocks: [
//                   {
//                     inlines: [
//                       {
//                         text: String(text), // Ensure text is a string
//                       },
//                     ],
//                   },
//                 ],
//               };
//             }),
//           })),
//         },
//       ],
//     },
//   ],
// };
// const sfdtString = JSON.stringify(sfdt);
// editorObj.current.documentEditor.open(sfdtString);
