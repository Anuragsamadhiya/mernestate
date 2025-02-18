import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
    },

    updateusersuccess:(state,action)=>{
      state.currentUser=action.payload;
      state.error=null;
    },
    updateuserfail:(state,action)=>{
      state.error=action.payload;
    },
    deleteusersuccess:(state,action)=>{
      state.currentUser=null;
      state.error=null;
    },
    deleteuserfail:(state,action)=>{
      state.error=action.payload;
    }
}
});
export const{signInFailure,signInSuccess,updateuserfail,deleteusersuccess,deleteuserfail,updateusersuccess}=userSlice.actions
export default userSlice.reducer