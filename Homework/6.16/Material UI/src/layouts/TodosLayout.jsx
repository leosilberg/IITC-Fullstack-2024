import { Drawer, List, ListItem, Toolbar } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function TodosLayout() {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: "200px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "200px",
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem>
            <Link to="/todos/create">Create Todo</Link>
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </>
  );
}
