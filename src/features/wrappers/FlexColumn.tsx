import { Box } from "@mui/joy";

export const FlexColumn = ({ children, sx, ...props }: any) => {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 2,
        ...sx,
      }}
    >

      {children}
    </Box>
  );
};
