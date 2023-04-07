import {
  NearMeOutlined,
  PanToolOutlined,
  RectangleOutlined,
  CallMade,
  SentimentVerySatisfied,
  Undo,
  Redo,
  StickyNote2Outlined,
  Tab,
} from "@mui/icons-material";
import { Paper, Stack, IconButton, Divider } from "@mui/material";

type Props = {
  activeTool: string;
  onSelectTool: (tool: string) => void;
};

export const WhiteboardTool: React.FC<Props> = ({
  activeTool,
  onSelectTool,
}) => {
  return (
    <Paper elevation={3} sx={{ zIndex: 300, padding: 1, borderRadius: 4 }}>
      <Stack spacing={1}>
        <IconButton size="small" onClick={() => onSelectTool("select")}>
          <NearMeOutlined
            color={activeTool === "select" ? "primary" : "action"}
          />
        </IconButton>
        <IconButton size="small" onClick={() => onSelectTool("hand")}>
          <PanToolOutlined
            color={activeTool === "hand" ? "primary" : "action"}
          />
        </IconButton>
        <Divider />
        <IconButton size="small" onClick={() => onSelectTool("geo")}>
          <RectangleOutlined
            color={activeTool === "geo" ? "primary" : "action"}
          />
        </IconButton>
        <IconButton size="small" onClick={() => onSelectTool("arrow")}>
          <CallMade color={activeTool === "arrow" ? "primary" : "action"} />
        </IconButton>
        <IconButton size="small" onClick={() => onSelectTool("note")}>
          <StickyNote2Outlined
            color={activeTool === "note" ? "primary" : "action"}
          />
        </IconButton>
        <IconButton size="small" onClick={() => onSelectTool("theme")}>
          <SentimentVerySatisfied
            color={activeTool === "theme" ? "primary" : "action"}
          />
        </IconButton>
        <IconButton size="small" onClick={() => onSelectTool("frame")}>
          <Tab color={activeTool === "frame" ? "primary" : "action"} />
        </IconButton>
        <Divider />
        <IconButton size="small">
          <Undo color="action" />
        </IconButton>
        <IconButton size="small">
          <Redo color="action" />
        </IconButton>
      </Stack>
    </Paper>
  );
};
