import home from "../src/styles/home.module.css";
import "./index.css";

import { useState } from "react";
import Bundler from "./bundle";
import Preview from "./preview";
import MonacoEditor from "./code-editor";
import { Resizable } from "re-resizable";
import { useEffect } from "react";
import ConsoleElement from "./console-element";

const App = () => {
  const [code, setCode] = useState<string | undefined>("");

  const [error, setError] = useState("");
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const interval = setTimeout(async () => {
      const { code, error } = await Bundler(inputText);
      setCode(code);
      setError(error);
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [inputText]);

  return (
    <div>
      <main className={home.main_wrapper}>
        <div className={home.wrapper}>
          {/* <textarea
            rows={5}
            cols={5}
            value={inputText}
            className={home.input_textarea}
            onChange={(event) => setInputText(event.target.value)}
          ></textarea> */}
          <div className="resizable">
            <Resizable
              defaultSize={{ width: 600, height: "100%" }}
              minWidth={10}
              minHeight={10}
            >
              <MonacoEditor onChange={(value) => setInputText(value || "")} />
            </Resizable>
          </div>
          {/* <button className={home.submit_button} onClick={handleSubmit}>
            Submit
          </button> */}
          {/* <pre className={home.display_code}>{code}</pre> */}
          <div className="preview">
            <Preview code={code} error={error} />
          </div>
        </div>
        <ConsoleElement />
      </main>
    </div>
  );
};

export default App;
