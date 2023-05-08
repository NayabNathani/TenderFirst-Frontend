import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({},{
    loginRequest:(state)=>{
        state.loading=true;
    },
    loginSuccess:(state, action)=>{
        state.loading=false;
        state.isAllowed=true;
        state.user = action.payload.result;
    },
    loginFail:(state, action)=>{
        state.loading=false;
        state.isAllowed=false;
        state.error = action.payload;

    },
    clearError:(state)=>{
        state.error=null;
    },

})