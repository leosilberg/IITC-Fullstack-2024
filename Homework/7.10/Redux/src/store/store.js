import { configureStore } from "@reduxjs/toolkit";
import personReducer from "./reducers/person.reducer.js";

// const rootReducer = combineReducers({
//   personModule: personReducer,
//   accountModule: accountReducer,
// });
// const initialState = {
//   accountModule: { amount: 1000 },
// };
// const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

const store = configureStore({
  reducer: {
    people: personReducer,
  },
  preloadedState: {
    people: [{ name: "Amy", age: 30 }],
  },
});
export default store;
