"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Typography, Box, Avatar, TextField, Button, Alert } from "@mui/material";
import { updateProfileApi } from "@/api/profileApi";
import { updateProfile } from "@/redux/actions/profileActions";

const EditProfile = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userDetails = Object.fromEntries(data);
    try {
      dispatch(updateProfile.request());
      const response = await updateProfileApi(userDetails);
      dispatch(updateProfile.success(response));
      onClose();
    } catch (error) {
      console.error("Edit Profile Error:", error);
      console.error("Error: ++ ", error);
      setError(error.data.error || "An error occurred while updating the profile.");
      dispatch(updateProfile.failure(error));
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
            onSubmit={handleFormSubmit}
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
