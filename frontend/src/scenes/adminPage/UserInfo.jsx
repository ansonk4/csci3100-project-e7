import FlexBetween from "../../components/FlexBetween.jsx";
import UserImage from "../../components/UserImage.jsx";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteForever from '@mui/icons-material/DeleteForever';

const UserInfo = ({id, name, picturePath}) => {
  const navigate = useNavigate();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;

  const deleteUser = async () => {
    const response = await fetch(`http://localhost:3001/users/delete/${id}`, {method:"DELETE"});
    await response.json();
    navigate(0);
  }

  return (
    <FlexBetween mb="0.5rem" mx="1rem">
      <FlexBetween gap="1rem">
        <UserImage image={picturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${id}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
        <DeleteForever sx={{ color: primaryDark }} onClick={deleteUser} />
      </IconButton>
    </FlexBetween>
  );
}

export default UserInfo;