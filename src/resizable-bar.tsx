import React from "react";
import { ResizableBox } from "react-resizable";

interface ResizableState {
  children: React.ReactNode;
}

const ResizableBar = ({ children }: ResizableState) => {
  return (
    <ResizableBox
      width={200}
      height={200}
      resizeHandles={["e"]}
      axis="x"
      className="box borderBox"
    >
      {children}
    </ResizableBox>
  );
};

export default ResizableBar;
