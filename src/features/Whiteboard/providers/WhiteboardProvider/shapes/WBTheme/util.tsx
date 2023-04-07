import { Box } from "@mui/system";
import { Box2d, toDomPrecision, Vec2d } from "@tldraw/primitives";
import { defineShape, TLShapeUtil, Vec2dModel } from "@tldraw/tldraw";

import { TextLabel } from "../shared/TextLabel";

import { WBThemeShape } from ".";

const THEME_SIZE = 200;

export class WBThemeUtil extends TLShapeUtil<WBThemeShape> {
  static type = "theme";

  canEdit = () => true;
  hideResizeHandes = () => true;
  hideSelectionBoundsBg = () => true;
  hideSelectionBounds = () => true;

  defaultProps(): WBThemeShape["props"] {
    return {
      opacity: "1",
      growY: 0,
      text: "",
    };
  }

  getHeight(shape: WBThemeShape) {
    return THEME_SIZE + shape.props.growY;
  }

  protected getBounds(shape: WBThemeShape): Box2d {
    const height = this.getHeight(shape);
    return new Box2d(0, 0, THEME_SIZE, height);
  }

  protected getOutline(shape: WBThemeShape): Vec2dModel[] {
    return this.bounds(shape).corners;
  }

  getCenter(shape: WBThemeShape): Vec2dModel {
    return new Vec2d(THEME_SIZE / 2, this.getHeight(shape) / 2);
  }

  render(shape: WBThemeShape) {
    const {
      id,
      type,
      props: { text },
    } = shape;

    return (
      <div
        style={{
          position: "absolute",
          width: THEME_SIZE,
          height: this.getHeight(shape),
          backgroundColor: "orange",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            pointerEvents: "all",
          }}
        >
          <TextLabel
            id={id}
            type={type}
            size={"s"}
            font={"draw"}
            align={"start"}
            text={text}
            labelColor="inherit"
          />
        </Box>
      </div>
    );
  }

  indicator(shape: WBThemeShape) {
    return (
      <rect
        width={toDomPrecision(THEME_SIZE)}
        height={toDomPrecision(this.getHeight(shape))}
      />
    );
  }
}

export const WBThemeShapeDef = defineShape<WBThemeShape, WBThemeUtil>({
  getShapeUtil: () => WBThemeUtil,
  type: "theme",
});
