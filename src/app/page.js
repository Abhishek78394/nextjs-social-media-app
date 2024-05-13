"use client";
import Add from "@/components/Add";
import Feed from "@/components/Feed";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar />
          {/* <Feed /> */}
          <Add />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default page;
