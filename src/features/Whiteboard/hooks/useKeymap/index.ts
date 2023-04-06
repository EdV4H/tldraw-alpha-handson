import { TLAsset, TLAssetId, useApp } from "@tldraw/editor";
import { useCallback } from "react";

export const useKeymap = () => {
  const app = useApp();

  const setKeymap = useCallback(
    (e: KeyboardEvent) => {
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
    },
    [app]
  );

  return { setKeymap };
};
