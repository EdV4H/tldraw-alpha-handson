import { StateNode, TLEventHandlers } from "@tldraw/tldraw";

export class Idle extends StateNode {
  static override id = "idle";

  onPointerDown: TLEventHandlers["onPointerDown"] = (info) => {
    this.parent.transition("pointing", info);
  };

  onEnter = () => {
    this.app.setCursor({ type: "cross" });
  };

  onCancel = () => {
    this.app.setSelectedTool("select");
  };
}
