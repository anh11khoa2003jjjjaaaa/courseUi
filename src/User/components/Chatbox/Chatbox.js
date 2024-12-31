// import React, { useState } from "react";
// import { generateChatResponse } from "../../../Service/gemini";
// import { Box, TextField, Button, Paper, Typography } from "@mui/material";

// const Chatbox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;
  
//     // Thêm tin nhắn của người dùng vào danh sách
//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
  
//     // Hiển thị tin nhắn "Typing..." từ bot
//     const botMessage = { sender: "bot", text: "Typing..." };
//     setMessages((prev) => [...prev, botMessage]);
  
//     try {
//       // Gửi yêu cầu đến API Gemini
//       const response = await axios.post(
//         'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDULGqxBIPjMfqGZLD3KU21J5jLi6fHNAo',
//         {
//           contents: [
//             {
//               parts: [
//                 { text: input } // Nội dung người dùng nhập
//               ]
//             }
//           ]
//         }
//       );
  
//       // Lấy phản hồi từ API
//       const botResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
      
//       // Cập nhật tin nhắn từ bot
//       setMessages((prev) =>
//         prev.map((msg, index) =>
//           index === prev.length - 1 ? { sender: "bot", text: botResponse } : msg
//         )
//       );
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setMessages((prev) =>
//         prev.map((msg, index) =>
//           index === prev.length - 1
//             ? { sender: "bot", text: "Error: Could not get response from AI" }
//             : msg
//         )
//       );
//     }
  
//     // Xóa nội dung input sau khi gửi
//     setInput("");
//   };
  
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         maxWidth: "400px",
//         height: "500px",
//         margin: "auto",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//         overflow: "hidden",
//         bgcolor: "background.paper",
//       }}
//     >
//       {/* Messages Section */}
//       <Paper
//         sx={{
//           flex: 1,
//           padding: 2,
//           overflowY: "auto",
//           display: "flex",
//           flexDirection: "column",
//           gap: 1,
//         }}
//       >
//         {messages.map((msg, index) => (
//           <Typography
//             key={index}
//             variant="body2"
//             align={msg.sender === "user" ? "right" : "left"}
//             sx={{
//               alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
//               bgcolor: msg.sender === "user" ? "primary.light" : "grey.200",
//               color: msg.sender === "user" ? "primary.contrastText" : "text.primary",
//               padding: "8px 12px",
//               borderRadius: "16px",
//               maxWidth: "70%",
//             }}
//           >
//             {msg.text}
//           </Typography>
//         ))}
//       </Paper>

//       {/* Input Section */}
//       <Box
//         sx={{
//           display: "flex",
//           gap: 1,
//           padding: 2,
//           borderTop: "1px solid #ccc",
//         }}
//       >
//         <TextField
//           fullWidth
//           size="small"
//           variant="outlined"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask me anything..."
//         />
//         <Button
//           variant="contained"
//           onClick={handleSendMessage}
//           disabled={!input.trim()}
//         >
//           Send
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Chatbox;
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Chatbox = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const botTypingMessage = { sender: "bot", text: "Typing..." };
    setMessages((prev) => [...prev, botTypingMessage]);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDULGqxBIPjMfqGZLD3KU21J5jLi6fHNAo",
        {
          contents: [
            {
              parts: [{ text: userMessage.text }],
            },
          ],
        }
      );

      const botResponse =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from AI.";
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { sender: "bot", text: botResponse } : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? { sender: "bot", text: "Error: Could not get response from AI" }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* Header với tên Chatbox và nút đóng */}
      <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            Chatbox
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Khu vực tin nhắn */}
      <Paper
        sx={{
          flex: 1,
          padding: 2,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {messages.map((msg, index) => (
          <Typography
            key={index}
            variant="body2"
            align={msg.sender === "user" ? "right" : "left"}
            sx={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              bgcolor: msg.sender === "user" ? "primary.light" : "grey.200",
              color: msg.sender === "user" ? "primary.contrastText" : "text.primary",
              padding: "8px 12px",
              borderRadius: 2,
              maxWidth: "70%",
            }}
          >
            {msg.sender === "user" ? "You" : "AI"}: {msg.text}
          </Typography>
        ))}
        {loading && (
          <Box sx={{ alignSelf: "flex-start", display: "flex", alignItems: "center" }}>
            <CircularProgress size={16} sx={{ marginRight: 1 }} />
            <Typography variant="body2">Typing...</Typography>
          </Box>
        )}
      </Paper>

      {/* Khu vực nhập tin nhắn */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          padding: 2,
          borderTop: "1px solid #ccc",
        }}
      >
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          disabled={loading || !input.trim()}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbox;
