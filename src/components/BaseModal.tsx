import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface PropsI {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function BaseModal({ open, title, children, onClose }: PropsI) {
  return (
    <>
      <Modal open={open} onClose={onClose} closeAfterTransition>
        <Fade in={open}>
          <Box sx={style}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                id="modal-title"
                variant="h6"
                color="black"
                component="h2"
                textAlign="center"
              >
                {title}
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Stack id="modal-description" color="black" sx={{ mt: 2 }}>
              {children}
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
