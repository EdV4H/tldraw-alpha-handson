import { useApp } from "@tldraw/tldraw";
import { useEffect } from "react";
import { track } from "signia-react";

import { useKeymap } from "../hooks";

import { ToolSection } from "./ToolSection";
import { TopSection } from "./TopSection";

import "@tldraw/tldraw/editor.css";
import "@tldraw/tldraw/ui.css";

export const Template: React.FC = track(() => {
  const app = useApp();
  const { setKeymap } = useKeymap();

  useEffect(() => {
    // const handlePointerMove = (e: PointerEvent) => {
    //   console.log(app.inputs.currentPagePoint);
    // };

    // window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keyup", setKeymap);
    return () => {
      // window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keyup", setKeymap);
    };
  });

  return (
    <>
      <TopSection title="💪🏻Wevox Product Team のふりかえり （2023/03/12）" />
      <ToolSection
        activeTool={app.currentToolId}
        onSelectTool={(tool) => {
          app.setSelectedTool(tool);
        }}
      />
    </>
  );
});
