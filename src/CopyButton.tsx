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
