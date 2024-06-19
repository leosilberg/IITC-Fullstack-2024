import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

export default function DisplayModal({
  open,
  message,
  handleClose,
  handleConfirm,
}) {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Card>
            <CardContent>
              <Typography variant="body1">{message}</Typography>
            </CardContent>
            <CardActions>
              <Button variant="text" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleConfirm();
                  handleClose();
                }}
              >
                Confirm
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </>
  );
}
