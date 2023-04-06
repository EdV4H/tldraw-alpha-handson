import { useContext } from "react";

import { WhiteboardContext } from "../../providers";

export const useWhiteboard = () => useContext(WhiteboardContext);
