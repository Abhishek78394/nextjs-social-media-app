"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { requestSent, receivedError, responseReceived } from "@/store/utilsActions";
import { UpdateProfileApi } from "@/store/api/authApi";
import { UpdateProfile } from "@/store/actions/authAction";
import { Container, Typography, Box, Avatar, TextField, Button, Alert } from "@mui/material";

const EditProfile = ({ user, onClose, onUpdateUser }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userDetails = Object.fromEntries(data);

    try {
      dispatch(requestSent());
      const response = await UpdateProfileApi(userDetails);
      onUpdateUser(response);
      onClose();
    } catch (error) {
      console.error("Edit Profile Error:", error);
      setError(error.message || "An error occurred while updating the profile.");
      dispatch(receivedError(error));
    } finally {
      dispatch(responseReceived());
    }
  };

  return (
   <div className="editProfile">
     <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
        <Typography component="h1" variant="h5" color={"black"}>
          Edit Profile
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          {["name", "username", "email", "gender", "phone"].map((field) => (
            <TextField
              key={field}
              margin="normal"
              required
              fullWidth
              id={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              defaultValue={user?.[field]}
            />
          ))}
           <TextField
                margin="normal"
                fullWidth
                id="bio"
                label="Bio"
                name="bio"
                defaultValue={user?.bio}
                multiline
                rows={4}
            />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
   </div>
  );
};

export default EditProfile;