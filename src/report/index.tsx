import { Box, Button } from "@mui/material";
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import { useEffect, useRef, useState } from "react";
import ChartModal from "../components/ChartModal";
import "./style.css";

DocumentEditorContainerComponent.Inject(Toolbar);

const Report = () => {
  const editorObj = useRef<DocumentEditorContainerComponent | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  // useEffect(() => {
  //   if (editorObj.current) {
  //     editorObj.current.documentEditor.isReadOnly = isReadOnly;
  //     editorObj.current.documentEditor.enableSfdtExport = false;
  //   }
  // }, [isReadOnly]);

  const handleInsertImage = (imageData: string) => {
    if (editorObj.current) {
      const editor = editorObj.current.documentEditor;
      editor.editor.insertImage(imageData);
    }
  };
  const tableData = [
    { name: "a", age: "8", phone: "123456" },
    { name: "b", age: "9", phone: "13579" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
    { name: "a", age: "8", phone: "123456" },
    { name: "b", age: "9", phone: "13579" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
    { name: "a", age: "8", phone: "123456" },
    { name: "b", age: "9", phone: "13579" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
    { name: "a", age: "8", phone: "123456" },
    { name: "b", age: "9", phone: "13579" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
    { name: "a", age: "8", phone: "123456" },
    { name: "b", age: "9", phone: "13579" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
    { name: "a", age: "8", phone: "123456" },
    { name: "b", age: "9", phone: "13579" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
    { name: "c", age: "10", phone: "246810" },
  ];
  const insertTableWithData = () => {
    try {
      setIsLoaded(true);
      if (editorObj.current) {
        const editor = editorObj.current.documentEditor.editor;
        const fields = Object.keys(tableData[0]) as Array<
          keyof (typeof tableData)[0]
        >;
        const rowCount = tableData.length + 1; // +1 for header
        const colCount = fields.length;
        editor.insertTable(tableData.length + 1, fields.length);
        const sfdt = {
          sections: [
            {
              blocks: [
                {
                  rows: Array.from({ length: rowCount }, (_, rowIndex) => ({
                    rowFormat: {},
                    cells: Array.from({ length: colCount }, (_, colIndex) => {
                      const text =
                        rowIndex === 0
                          ? fields[colIndex].charAt(0).toUpperCase() +
                            fields[colIndex].slice(1) // Header
                          : tableData[rowIndex - 1][fields[colIndex]]; // Data
                      return {
                        blocks: [
                          {
                            inlines: [
                              {
                                text: String(text), // Ensure text is a string
                              },
                            ],
                          },
                        ],
                      };
                    }),
                  })),
                },
              ],
            },
          ],
        };
        const sfdtString = JSON.stringify(sfdt);
        editorObj.current.documentEditor.open(sfdtString);

        // // Add header row
        // fields.forEach((field, index) => {
        //   editor.insertText(field.charAt(0).toUpperCase() + field.slice(1));
        //   if (index < fields.length - 1) {
        //     moveCursorToNextCell();
        //   }
        // });

        // // Move to the next row (first data row)
        // moveCursorToNextRow();

        // // Populate the table with data
        // tableData.forEach((item) => {
        //   fields.forEach((field: keyof typeof item, index) => {
        //     editor.insertText(item[field]);
        //     if (index < fields.length - 1) {
        //       moveCursorToNextCell();
        //     }
        //   });
        //   moveCursorToNextRow();
        // });
      }
    } catch (error) {
      console.error("Error inserting table:", error);
    } finally {
      setIsLoaded(false);
    }
  };
  // const toggleReadOnly = () => {
  //   setIsReadOnly((prev) => !prev); // Toggle read-only state
  // };
  const toggleReadOnly = () => {
    if (editorObj.current) {
      const newReadOnlyState = !editorObj.current.documentEditor.isReadOnly;
      editorObj.current.documentEditor.isReadOnly = newReadOnlyState;
      setIsReadOnly(newReadOnlyState);
    }
  };

  // const moveCursorToNextCell = () => {
  //   if (editorObj.current) {
  //     const selection = editorObj.current.documentEditor.selection;
  //     const startOffset = selection.startOffset;
  //     const offsetArray = startOffset.split(";");
  //     offsetArray[3] = (parseInt(offsetArray[3]) + 1).toString(); // Increment cell index
  //     const newOffset = offsetArray.join(";");
  //     selection.select(newOffset, newOffset); // Move cursor to next cell
  //   }
  // };

  // // Function to move cursor to the next row (first cell)
  // const moveCursorToNextRow = () => {
  //   if (editorObj.current) {
  //     const selection = editorObj.current.documentEditor.selection;
  //     const startOffset = selection.startOffset;
  //     const offsetArray = startOffset.split(";");
  //     offsetArray[2] = (parseInt(offsetArray[2]) + 1).toString(); // Increment row index
  //     offsetArray[3] = "0"; // Reset to first cell in the row
  //     const newOffset = offsetArray.join(";");
  //     selection.select(newOffset, newOffset); // Move cursor to next row
  //   }
  // };

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
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={handleOpenModal}
            disabled={isLoaded}
          >
            {isLoaded ? "Inserting..." : "Insert Chart"}
          </Button>
          <Button variant="contained" sx={{ m: 1 }} onClick={toggleReadOnly}>
            {isReadOnly ? "Make Editable" : "Make Read-Only"}
          </Button>
        </Box>
        <ChartModal
          open={openModal}
          onClose={handleCloseModal}
          onInsertImage={handleInsertImage}
        />

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

// interface TableData {
//   name: string;
//   age: string;
//   phone_number: Array<string>;
//   email: number;
//   date: Date;
//   id: string;
// }

// interface TransformedTableData {
//   Name: string;
//   Age: string;
//   "Phone number": string;
//   Email: string;
//   Date: string;
//   Id: string;
// }

// const [data, setData] = useState<TableData[]>([]);
// const [transformedData, setTransformedData] = useState<
//   TransformedTableData[]
// >([]);
// const fetchData = async () => {
//   const res = await axios.get(
//     "https://675e7ce663b05ed0797a446e.mockapi.io/account"
//   );
//   setData(res.data);
// };
// useEffect(() => {
//   fetchData();
// }, []);
// console.log(data);
// useEffect(() => {
//   const newTransformedData = data.map((item) => ({
//     Name: String(item.name),
//     Age: String(item.age),
//     "Phone number": Array.isArray(item.phone_number)
//       ? item.phone_number.join(", ")
//       : String(item.phone_number),
//     Email: String(item.email),
//     Date:
//       item.date instanceof Date ? item.date.toISOString() : String(item.date),
//     Id: String(item.id),
//   }));
//   setTransformedData(newTransformedData);
// }, [data]);

// console.log("Original Data:", data);
// console.log("Transformed Data:", transformedData);
