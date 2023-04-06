import { DashboardOutlined } from "@mui/icons-material";
import { Paper, Stack, Typography } from "@mui/material";

type Props = {
  title: string;
};

export const TitleBar: React.FC<Props> = ({ title }) => {
  return (
    <Paper
      elevation={3}
      sx={{ zIndex: 300, paddingX: 2, paddingY: 2, borderRadius: 3 }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <DashboardOutlined />
        <Typography variant="body1">{title}</Typography>
      </Stack>
    </Paper>
  );
};
