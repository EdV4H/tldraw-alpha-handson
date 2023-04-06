import { TLAsset, TLAssetId, useApp } from "@tldraw/tldraw";
import { ComponentProps, useEffect } from "react";
import { track } from "signia-react";
import { useUsers } from "y-presence";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

import { Cursor } from "./Cursor";
import { ToolSection } from "./ToolSection";
import { TopSection } from "./TopSection";

import "@tldraw/tldraw/editor.css";
import "@tldraw/tldraw/ui.css";

const doc = new Y.Doc();

const provider = new WebsocketProvider(
  "ws://localhost:1234",
  "y-presence-demo",
  doc
);

const awareness = provider.awareness;
const random = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const USER_COLORS = [
  "#1a1c2c",
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#144cb5",
  "#FF8A65",
  "#F06292",
  "#7986CB",
];

export const USER_NAMES = [
  "Daniel",
  "John",
  "Mary",
  "Harry",
  "Nico",
  "Ricky",
  "Sam",
  "Tom",
];

const name = random(USER_NAMES);
const color = random(USER_COLORS);
awareness.setLocalStateField("user", {
  name,
  color,
});

export const Template: React.FC = track(() => {
  const app = useApp();
  const users = useUsers(awareness);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      awareness.setLocalStateField("cursor", {
        x: app.inputs.currentPagePoint.x,
        y: app.inputs.currentPagePoint.y,
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (app.editingId) return;
      switch (e.key) {
        case "Delete":
        case "Backspace": {
          app.deleteShapes();
          break;
        }
        case "z": {
          if (e.ctrlKey) {
            app.undo();
          }
          break;
        }
        case "g": {
          if (e.ctrlKey) {
            app.ungroupShapes(app.selectedIds);
          }
          break;
        }
        case "d": {
          app.createShapes([
            {
              id: app.createShapeId(),
              type: "insight",
              props: { opacity: 1 },
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            },
          ]);
          break;
        }
        case "D": {
          const offset = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          };
          const shapeIds = Array.from({ length: 3 }).map(() =>
            app.createShapeId()
          );
          const assetId: TLAssetId = TLAsset.createId();
          app.createAssets([
            {
              id: assetId,
              type: "image",
              typeName: "asset",
              props: {
                src: "https://picsum.photos/200",
                isAnimated: false,
                mimeType: "image/jpeg",
                name: "Untitled",
                w: 250,
                h: 250,
              },
            },
          ]);
          app.createShapes([
            {
              id: shapeIds[0],
              type: "geo",
              x: offset.x - 250,
              y: offset.y - 130,
              props: {
                geo: "rectangle",
                opacity: "1",
                color: "red",
                fill: "solid",
                w: 500,
                h: 260,
              },
            },
            {
              id: shapeIds[1],
              type: "image",
              x: offset.x - 225,
              y: offset.y - 105,
              props: {
                opacity: "1",
                assetId: assetId,
                w: 210,
                h: 210,
                url: "https://picsum.photos/200",
              },
            },
            {
              id: shapeIds[2],
              type: "note",
              x: offset.x + 25,
              y: offset.y - 105,
              props: {
                opacity: "1",
                // random message from array
                text: [
                  "Awsome work!",
                  "This is a monster problem",
                  "I'm so proud of you",
                  "You're doing great",
                ][Math.floor(Math.random() * 4)],
              },
            },
          ]);
          app.groupShapes(shapeIds);
          break;
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keyup", handleKeyUp);
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
      {users &&
        Array.from(users.entries()).map(([key, value]) => {
          if (key === awareness.clientID) return null;
          if (!value.cursor || !value.user.color || !value.user.name)
            return null;

          return (
            <Cursor
              key={key}
              cursor={value.cursor as ComponentProps<typeof Cursor>["cursor"]}
              color={value.user.color as ComponentProps<typeof Cursor>["color"]}
              name={value.user.name as ComponentProps<typeof Cursor>["name"]}
            />
          );
        })}
    </>
  );
});
