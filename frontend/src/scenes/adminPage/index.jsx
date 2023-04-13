import { Box, TextField, Typography, useTheme, Stack, Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";
import UserInfo from "./UserInfo.jsx";

const AdminPage = () => {
  const theme = useTheme();
  const [allUsers, setAllUsers] = useState([]);

  const getUser = async () => {
    const response = await fetch( `http://localhost:3001/users/search`, { method: "GET" } );
    const users = await response.json();
    setAllUsers(users);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return ( 
    <Box> 
        <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
        >
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            Admin Mode 
          </Typography>
        </Box>

        <Box>
        <Autocomplete
          id="searchbar"
          freeSolo
          open={true}
          options={allUsers}
          getOptionLabel={(user) => `${user.firstName} ${user.lastName}`}
          renderOption={(props, user, state) => <UserInfo id={user._id} name={`${user.firstName} ${user.lastName}`} picturePath={user.picturePath} />}
          renderInput={(params) => <TextField {...params} label="Search User" />}
          ListboxProps={{ style: { maxHeight: '1000rem' } }}
        />
        </Box>
    </Box>
  );
}

export default AdminPage;