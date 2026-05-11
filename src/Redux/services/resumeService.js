import { createSlice } from "@reduxjs/toolkit";
const resumeSlice = createSlice({
  name: "resume",
  initialState: { data: null },
  reducers: {
    setResumeData: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { setResumeData } = resumeSlice.actions;
export default resumeSlice.reducer;
