import { Stack } from "@mui/system";
import { Box2d, toDomPrecision, Vec2d } from "@tldraw/primitives";
import { TLShapeUtil } from "@tldraw/tldraw";

import { InsightShape } from ".";

export class InsightUtil extends TLShapeUtil<InsightShape> {
  static type = "insight";

  override defaultProps(): InsightShape["props"] {
    return {
      opacity: "1",
    };
  }

  getOutline(shape: InsightShape) {
    return this.bounds(shape).corners;
  }

  getBounds(shape: InsightShape) {
    return new Box2d(0, 0, 300, 200);
  }

  getCenter(shape: InsightShape) {
    return new Vec2d(150, 100);
  }

  render(shape: InsightShape) {
    const bounds = this.bounds(shape);

    return (
      <Stack
        width={300}
        height={200}
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{
          border: "1px solid black",
          pointerEvents: "all",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: "url(https://picsum.photos/200)",
          }}
        />
        <div>insight</div>
      </Stack>
    );
  }

  indicator(shape: InsightShape) {
    return (
      <rect rx="7" width={toDomPrecision(300)} height={toDomPrecision(200)} />
    );
  }
}
