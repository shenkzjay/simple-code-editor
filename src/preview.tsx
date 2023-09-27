import { useEffect, useRef } from "react";
import preview from "./styles/preview.module.css";

interface Code {
  code: string | undefined;
  error: string;
}

const htmlEle = `
<html>
<head></head>
<body>
  <div id="root"></div>
  <script>
  const handleError = (error) => {
    const root = document.querySelector('#root')
      root.innerHTML = '<div style="color:red"><h4>Runtime error</h4> ' + error + '</div>'
      console.error(error)
  }

  window.addEventListener('error', (event)=>{
    event.preventDefault()
    handleError(event.error)
  })

  window.addEventListener("message", (event) =>{
    try {
      (function(process) {
        eval(event.data);
      })({ env: { NODE_ENV: 'production' } });
    } catch (error) {
      handleError(error)
    }
   
  }, false)
  </script>
</body>
</html>`;

const Preview = ({ code, error }: Code) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = htmlEle;

    iframeRef.current.onload = () => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    };
  }, [code]);

  return (
    <div className={preview.iframe}>
      <iframe
        sandbox="allow-scripts"
        ref={iframeRef}
        srcDoc={htmlEle}
        className={preview.iframe_style}
      ></iframe>
      <div>{error}</div>
    </div>
  );
};

export default Preview;
