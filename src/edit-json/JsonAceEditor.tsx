import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github"; // Light theme
import "ace-builds/src-noconflict/theme-monokai"; // Dark VS Code-like
import "ace-builds/src-noconflict/ext-language_tools"; // For completion, etc.

function JsonAceEditor() {
  const [value, setValue] = useState(
    JSON.stringify(
      {
        name: "Example",
        version: "1.0.0",
      },
      null,
      2
    )
  );

  return (
    <AceEditor
      mode="json"
      theme="monokai" // Or "github" for light
      value={value}
      onChange={setValue}
      name="json-editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
      width="100%"
      height="80vh"
    />
  );
}

export default JsonAceEditor;
