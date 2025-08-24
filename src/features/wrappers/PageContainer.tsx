import { Sheet } from "@mui/joy";


export const PageContainer = ({ children, sx, ...props }: any) => {
  return (
    <Sheet
      {...props}
      sx={{
        width: "min(90vw, 1200px)",
        mx: "auto",
        px: 2,
        py: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        ...sx,
      }}
    >
      {children}
    </Sheet>
  );
};
