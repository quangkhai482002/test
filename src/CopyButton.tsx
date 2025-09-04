import { Button } from "@mui/material";

export default function CopyResult({ data }: { data: any }) {
  // Giả sử data có nhiều trường
  const result = {
    name: data.name,
    phone: data?.phone.join(", "),
    email: data.email,
    address: data.address,
  };

  const buildTable = (obj: any) => {
    const col1Width = 12; // độ rộng cột "key"
    const col2Width = 55; // độ rộng cột "value"
    const line = `+${"-".repeat(col1Width)}|${"-".repeat(col2Width)}+\n`;

    let table = line;

    Object.entries(obj).forEach(([key, value]) => {
      const valueStr = String(value ?? "");
      const chunks = valueStr.match(
        new RegExp(`.{1,${col2Width - 2}}`, "g")
      ) || [""];

      chunks.forEach((chunk, i) => {
        if (i === 0) {
          table += `| ${key.padEnd(col1Width - 1)}| ${chunk.padEnd(
            col2Width - 2
          )}|\n`;
        } else {
          table += `| ${"".padEnd(col1Width - 1)}| ${chunk.padEnd(
            col2Width - 2
          )}|\n`;
        }
      });

      table += line;
    });

    return table;
  };

  const handleCopy = () => {
    const table = buildTable(result);
    navigator.clipboard.writeText(table).then(() => {
      alert("Copied to clipboard!");
    });
  };

  return <Button onClick={handleCopy}>Copy Result</Button>;
}

// Courier New, Consolas

// import { Button } from "@mui/material";
// import { useCallback } from "react";

// interface CopyResultProps {
//   data: {
//     name?: string;
//     phone?: string[];
//     email?: string;
//     address?: string;
//   };
// }

// export default function CopyResult({ data }: CopyResultProps) {
//   const buildTable = useCallback(() => {
//     const col1Width = 12;
//     const col2Width = 55;
//     const line = `+${"-".repeat(col1Width)}|${"-".repeat(col2Width)}+\n`;

//     const result = {
//       name: data.name ?? "",
//       phone: data.phone?.join(", ") ?? "",
//       email: data.email ?? "",
//       address: data.address ?? "",
//     };

//     let table = line;
//     for (const [key, value] of Object.entries(result)) {
//       const valueStr = String(value);
//       const chunks =
//         valueStr.match(new RegExp(`.{1,${col2Width - 2}}`, "g")) || [""];

//       chunks.forEach((chunk, i) => {
//         const keyPadding = i === 0 ? key.padEnd(col1Width - 1) : "".padEnd(col1Width - 1);
//         table += `| ${keyPadding}| ${chunk.padEnd(col2Width - 2)}|\n`;
//       });
//       table += line;
//     }

//     return table;
//   }, [data]);

//   const handleCopy = useCallback(() => {
//     navigator.clipboard
//       .writeText(buildTable())
//       .then(() => alert("Copied to clipboard!"))
//       .catch(() => alert("Failed to copy to clipboard"));
//   }, [buildTable]);

//   return <Button onClick={handleCopy}>Copy Result</Button>;
// }
