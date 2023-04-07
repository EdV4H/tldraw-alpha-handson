import { Box } from "@mui/material";
import { Canvas, TldrawEditor, TldrawEditorConfig } from "@tldraw/tldraw";
import React from "react";

import { InsightShape } from "./shapes/Insight";
import { WBThemeTool } from "./shapes/WBTheme/tool";
import { WBThemeShapeDef } from "./shapes/WBTheme/util";

const customTldrawConfig = new TldrawEditorConfig({
  tools: [WBThemeTool],
  shapes: [InsightShape, WBThemeShapeDef],
  allowUnknownShapes: true,
});

type Props = {
  children: React.ReactNode;
};

export const WhiteboardProvider: React.FC<Props> = ({ children }) => {
  return (
    <div className="tldraw__editor">
      <div
        style={{
          position: "fixed",
          inset: 0,
        }}
      >
        <TldrawEditor config={customTldrawConfig}>
          <Canvas />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
            }}
          >
            {children}
          </Box>
        </TldrawEditor>
      </div>
    </div>
  );
};
