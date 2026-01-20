import { memo } from "react";
import { Box, Tabs, Tab } from "@mui/material";

const Toggler = memo(function Toggler({ value, items = [], onChange }) {
  if (!items.length) return null;

  return (
    <Box
      sx={{
        borderRadius: "999px",
        backgroundColor: "#e9e9e9",
        border: "1px solid #cfcfcf",
        p: "1px",
      }}
    >
      <Tabs
        value={value}
        onChange={(_, v) => onChange(v)}
        variant="fullWidth"
        TabIndicatorProps={{
          sx: {
            height: "100%",
            borderRadius: "999px",
            background:
              "linear-gradient(90deg, #90cea1, #3cbec9, #01b4e4)",
            zIndex: 0,
          },
        }}
        sx={{
          minHeight: "unset",
          "& .MuiTabs-flexContainer": {
            gap: 0,
          },
          "& .MuiTabs-indicator": {
            top: 0,
          },
        }}
      >
        {items.map((item) => (
          <Tab
            key={item.key}
            value={item.key}
            label={item.label}
            disableRipple
            sx={{
              zIndex: 1,
              minHeight: "unset",
              minWidth: "unset",
              px: 1,
              py: 0.4,
              borderRadius: "999px",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "none",
              whiteSpace: "nowrap",
              color: value === item.key ? "#fff" : "#032541",
              "&:hover": { backgroundColor: "transparent" },
              "&.Mui-selected": {
                color: "#fff",
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
});

export default Toggler;
