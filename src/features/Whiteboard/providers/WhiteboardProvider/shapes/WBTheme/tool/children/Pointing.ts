import {
  StateNode,
  TLEventHandlers,
  TLInterruptEvent,
  TLPointerEventInfo,
} from "@tldraw/tldraw";

import { WBThemeShapeDef } from "../../util";

export class Pointing extends StateNode {
  static override id = "pointing";

  dragged = false;

  info = {} as TLPointerEventInfo;

  wasFocusedOnEnter = false;

  markPoingId = "creating";

  onEnter = () => {
    this.wasFocusedOnEnter = !this.app.isMenuOpen;
  };

  onPointerMove: TLEventHandlers["onPointerMove"] = (info) => {
    if (this.app.inputs.isDragging) {
      this.app.mark(this.markPoingId);
      const shape = this.createShape();
      if (!shape) return;

      this.app.setSelectedTool("select.translating", {
        ...info,
        target: "sha;e",
        shape,
        isCreating: true,
        editAfterComplete: true,
        onInteractionEnd: "theme",
      });
    }
  };

  onPointerUp: TLEventHandlers["onPointerUp"] = () => {
    this.complete();
  };

  onInterrupt: TLInterruptEvent = () => {
    this.cancel();
  };

  onComplete: TLEventHandlers["onComplete"] = () => {
    this.complete();
  };

  onCancel: TLEventHandlers["onCancel"] = () => {
    this.cancel();
  };

  private complete() {
    if (!this.wasFocusedOnEnter) return;

    this.app.mark(this.markPoingId);
    const shape = this.createShape();

    if (this.app.instanceState.isToolLocked) {
      this.parent.transition("idle", {});
    } else {
      if (!shape) return;

      this.app.setEditingId(shape.id);
      this.app.setSelectedTool("select.editing_shape", {
        ...this.info,
        target: "shape",
        shape,
      });
    }
  }

  private cancel() {
    this.app.bailToMark(this.markPoingId);
    this.parent.transition("idle", this.info);
  }

  private createShape() {
    const {
      inputs: { originPagePoint },
    } = this.app;

    const id = this.app.createShapeId();

    this.app.createShapes(
      [
        {
          id,
          type: "theme",
          x: originPagePoint.x,
          y: originPagePoint.y,
        },
      ],
      true
    );

    const util = this.app.getShapeUtilByDef(WBThemeShapeDef);
    const shape = this.app.getShapeById(id)!;
    if (!WBThemeShapeDef.is(shape)) throw new Error("Invalid shape");
    const bounds = util.bounds(shape);

    this.app.updateShapes([
      {
        id,
        type: "theme",
        x: shape.x - bounds.width / 2,
        y: shape.y - bounds.height / 2,
      },
    ]);

    return this.app.getShapeById(id);
  }
}
