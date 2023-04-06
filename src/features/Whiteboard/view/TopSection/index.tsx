import { Stack } from "@mui/material";

import { TitleBar } from "@/components";

type Props = {
  title: string;
};

export const TopSection: React.FC<Props> = ({ title }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      mt={2}
      ml={2}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      <TitleBar title={title} />
    </Stack>
  );
};
