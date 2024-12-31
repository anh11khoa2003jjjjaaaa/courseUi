
import React, { useState } from "react";
import Chatbox from "./Chatbox";
import { IconButton, Box, Drawer } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const ChatboxToggle = () => {
  const [open, setOpen] = useState(false);

  const toggleChatbox = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
      <IconButton
        onClick={toggleChatbox}
        sx={{
          bgcolor: "primary.main",
          color: "white",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
        size="large"
      >
        <ChatIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleChatbox}
        PaperProps={{
          sx: { width: 400, height: 500, boxShadow: 3, borderRadius: 2 },
        }}
      >
        <Chatbox onClose={toggleChatbox} />
      </Drawer>
    </Box>
  );
};

export default ChatboxToggle;
