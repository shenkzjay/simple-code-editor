import { useEffect, useState } from "react";

const ConsoleElement = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const originalConsole = console.log;

    console.log = (input) => {
      originalConsole(input);

      setLogs((prevLogs) => [...prevLogs, input]);
    };

    // Restore the original console.log when the component unmounts
    return () => {
      console.log = originalConsole;
    };
  }, []);

  return (
    <div>
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
};

export default ConsoleElement;
