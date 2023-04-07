import { StateNode, TLStyleType } from "@tldraw/tldraw";

import { Idle } from "./children/Idle";
import { Pointing } from "./children/Pointing";

export class WBThemeTool extends StateNode {
  static override id = "theme";
  static initial = "idle";
  static children = () => [Idle, Pointing];

  styles = ["opacity"] as TLStyleType[];
}
