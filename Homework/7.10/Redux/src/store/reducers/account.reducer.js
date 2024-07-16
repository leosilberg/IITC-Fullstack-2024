import { DEPOSIT, WITHDRAW } from "../actionTypes.js";

function accountReducer(state = { amount: 2000 }, action) {
  console.log(`account.reducer: `, state, action);
  switch (action.type) {
    case WITHDRAW:
      return { ...state, amount: state.amount - action.payload.amount };
    case DEPOSIT:
      return { ...state, amount: state.amount + action.payload.amount };
    default:
      return state;
  }
}

export default accountReducer;
