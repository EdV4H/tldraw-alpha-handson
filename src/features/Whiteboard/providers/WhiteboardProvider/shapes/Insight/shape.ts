import {
  defineShape,
  TLBaseShape,
  TLOpacityType,
} from "@tldraw/tldraw";

import { InsightUtil } from ".";

export type InsightShape = TLBaseShape<"insight", InsightShapeProps>;

type InsightShapeProps = {
  opacity: TLOpacityType;
};

export const InsightShape = defineShape<InsightShape>({
  type: "insight",
  getShapeUtil: () => InsightUtil,
});
