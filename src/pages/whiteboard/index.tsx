import { Whiteboard } from "@/features/Whiteboard";
import { WhiteboardProvider } from "@/features/Whiteboard/providers";

export const WhiteboardPage: React.FC = () => {
  return (
    <WhiteboardProvider>
      <Whiteboard />
    </WhiteboardProvider>
  );
};
