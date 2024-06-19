import { Card, CardContent, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

export default function TodoStatistics(props) {
  return (
    <Card>
      <CardContent>
        <div className="statistics__container">
          <div>
            <Typography variant="h5">Total</Typography>
            <Typography variant="h5"> {props.totalTodos}</Typography>
          </div>
          <div>
            <Typography variant="h5">Completed</Typography>
            <Typography variant="h5">{props.completedToDos}</Typography>
          </div>
          <div>
            <Typography variant="h5">Active</Typography>
            <Typography variant="h5">
              {props.totalTodos - props.completedToDos}
            </Typography>
          </div>
          <LinearProgress
            variant="determinate"
            value={(props.completedToDos / props.totalTodos) * 100}
            className="statistics__progress"
          ></LinearProgress>
        </div>
      </CardContent>
    </Card>
  );
}
