import * as React from 'react';
import { TextField, Stack, Autocomplete }from '@mui/material';
import Friend from 'components/Friend';


export default function FreeSolo() {
  const [allUsers, setAllUsers] = React.useState([]);

  const getUser = async () => {
      const response = await fetch( `http://localhost:3001/users/search`, { method: "GET" } );
      const users = await response.json();
      setAllUsers(users);
  };

  React.useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  
  return (
    <Stack spacing={2} sx={{ width: 300}}>
      <Autocomplete
        id="searchbar"
        freeSolo
        options={allUsers}
        getOptionLabel={(user) => `${user.firstName} ${user.lastName}`}
        renderOption={(props, user, state) => <Friend friendId={user._id} name={`${user.firstName} ${user.lastName}`} picturePath={user.picturePath} />}
        renderInput={(params) => <TextField {...params} label="Find someone here" />}
      />
    </Stack>
  );
}