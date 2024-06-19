import { AppBar, List, ListItem, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";

function TextNavLink({ href, children }) {
  return (
    <NavLink
      to={href}
      style={({ isActive }) => {
        return {
          color: isActive ? "darkblue" : "white",
        };
      }}
    >
      {children}
    </NavLink>
  );
}
export default function Navbar() {
  return (
    <>
      <AppBar
        position="sticky"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <List style={{ display: "flex", flexDirection: "row" }}>
            <ListItem>
              <TextNavLink href="/">Home</TextNavLink>
            </ListItem>
            <ListItem>
              <TextNavLink href="/todos/list">Todos</TextNavLink>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </>
  );
}
