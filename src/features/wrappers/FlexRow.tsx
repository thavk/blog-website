import { Box } from "@mui/joy";

export const FlexRow = ({ children, sx, ...props }: any) => {
  return (
    <Box
      {...props}

      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 2,
        flexWrap: "wrap",
        ...sx,
      }}

    >
      {children}
    </Box>
  );
};

