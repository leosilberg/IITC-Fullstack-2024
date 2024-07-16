import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../actions/account.action.js";

export const deletePersonAsync = createAsyncThunk(
  "person/deletePerson",
  async (payload) => {
    const data = await api(payload);
    return data;
  }
);
export const personSlice = createSlice({
  name: "person",
  initialState: [{ name: "Bob", age: 12 }],
  reducers: {
    addPerson: (state, action) => {
      console.log(`person.reducer: `, state, action);
      state.push({ name: action.payload.name, age: action.payload.age });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deletePersonAsync.pending, (state, action) => {
      console.log(`person.reducer: `, action);
    });
    builder.addCase(deletePersonAsync.fulfilled, (state, action) => {
      console.log(`person.reducer: `, action);
      return state.filter((person) => person.name != action.payload.name);
    });
    builder.addCase(deletePersonAsync.rejected, (state, action) => {
      console.log(`person.reducer: `, action);
    });
  },
});

export const { addPerson } = personSlice.actions;
export default personSlice.reducer;
