import {server} from "../store";
import axios from 'axios';

export const login = (email, password) => async(dispatch)=>{
    try {
        dispatch({type:"loginRequest"});

        const {data} = await axios.post(`${server}/user/login`,{email,password},
        {
            headers:{
                "Content-type":"application/json"
            },
            withCredentials:true,
        }
        );
        dispatch({type:"loginSuccess", payload: data});
        localStorage.setItem("isAuthenticated", true);
    } catch (error) {
        dispatch({type:"loginFail",});
    }
};

export const logout = () => async(dispatch)=>{
    try {
        dispatch({type:"logoutRequest"});

        dispatch({type:"logoutSuccess"});
        localStorage.setItem("isAuthenticated", false);
    } catch (error) {
        dispatch({type:"logoutFail",});
    }
};

export const registerUser = (firstName,lastName,email,password,contactNumber,organizationName,pool,category) => async (dispatch) => {
    try {
      dispatch({ type: "registerRequest" });
  
      const response = await axios.post(
        `${server}/user/signup`,
      {firstName,lastName,email,password,contactNumber,organizationName,pool,category},
      {
        headers:{
            "Content-type":"application/json"
        },
        withCredentials:true,
      }
      );
  
      // Dispatch an action object with the necessary data
      dispatch({
        type: "registerSuccess",
        payload: response.data ,
      });
    } catch (error) {
      dispatch({ type: "registerFail", payload: error.message });
    }
  };
  
  export const updateUserEmailSuccess = (newEmail) => ({
    type: "updateUserEmailSuccess",
    payload: newEmail,
  });