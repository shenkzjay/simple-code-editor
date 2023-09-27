import { Editor } from "@monaco-editor/react";

interface EditorProps {
  onChange: (value: string | undefined) => void;
}

const MonacoEditor = ({ onChange }: EditorProps) => {
  return (
    <div className="editor">
      <Editor
        value={`import React from 'react'
        \nimport ReactDOM from 'react-dom' 
        \nconst App = () => { \nreturn <div>Edit this text</div> \n} 
        \nReactDOM.render(<App/>, document.querySelector("#root"))\n`}
        onChange={onChange}
        height="400px"
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: false,
          fontSize: 16,
          automaticLayout: true,
          padding: { top: 20, bottom: 20 },
        }}
      />
    </div>
  );
};

export default MonacoEditor;
