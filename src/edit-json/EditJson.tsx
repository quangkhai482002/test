import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { linter, lintGutter } from "@codemirror/lint";
import { jsonParseLinter } from "@codemirror/lang-json"; // Built-in JSON linter
import { oneDark } from "@codemirror/theme-one-dark"; // Optional: dark theme like VS Code
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

function JsonEditor() {
  const [value, setValue] = useState(`{
  "name": "Example",
  "version": "1.0.0",
  "dependencies": {}
}`);

  return (
    <div style={{ height: "100vh", padding: "20px", boxSizing: "border-box" }}>
      <h2>JSON Editor (CodeMirror)</h2>
      <CodeMirror
        value={value}
        height="80vh"
        // theme={oneDark} // Remove or replace for light theme
        theme={vscodeDark}
        extensions={[
          json(), // JSON language support (highlighting, parsing)
          lintGutter(), // Shows lint markers in gutter
          linter(jsonParseLinter()), // Real-time JSON validation (errors highlighted)
          //   keymap.of([...defaultKeymap, indentWithTab]), // Standard shortcuts (including Tab indent)
        ]}
        onChange={(newValue) => setValue(newValue)}
      />
    </div>
  );
}

export default JsonEditor;
