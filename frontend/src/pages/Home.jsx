import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import withAuth from "../utils/withAuth";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="navBar">
        <h2 className="logo">📹 CallSphere</h2>

        <div className="navActions">
          <IconButton onClick={() => navigate("/history")}>
            <RestoreIcon />
          </IconButton>
          <span className="navText">History</span>

          <Button
            variant="text"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="hero">
        <div className="heroLeft">
          <h1>
            Simple. Secure. <span>Video Calls</span>
          </h1>

          <p>
            Connect instantly with anyone using a meeting code. High-quality
            video & audio, no sign-ups needed.
          </p>

          <div className="joinBox">
            <TextField
              label="Enter Meeting Code"
              variant="outlined"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleJoinVideoCall}
            >
              Join Now
            </Button>
          </div>
        </div>

        <div className="heroRight">
          <img src="/logo3.png" alt="Video call illustration" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
