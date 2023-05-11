import {server} from "../store";
import axios from 'axios';

export const login = (email, password) => async(dispatch)=>{
    try {
        dispatch({type:"loginRequest"});

        const {data} = await axios.post(`${server}/user/login`,{email,password},
        {
            headers:{
                "Content-type":"application/json"
            }
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

export const register = formdata => async (dispatch) => {
    try {
      dispatch({ type: "registerRequest" });
  
      const { data } = await axios.post(
        `${server}/user/signup`,
        formdata,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          
        }
      );
  
      // Dispatch an action object with the necessary data
      dispatch({
        type: "registerSuccess",
        payload: { data },
      });
  
      localStorage.setItem("isAuthenticated", true);
    } catch (error) {
      dispatch({ type: "registerFail" });
    }
  };
  