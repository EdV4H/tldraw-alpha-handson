import { TLBaseShape, TLOpacityType } from "@tldraw/tldraw";

export type WBThemeShapeProps = {
  opacity: TLOpacityType;
  growY: number;
  text: string;
};

export type WBThemeShape = TLBaseShape<"theme", WBThemeShapeProps>;
