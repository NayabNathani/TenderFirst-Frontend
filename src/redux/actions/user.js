import {server} from "../store";
import axios from 'axios';

export const login = (email, password) => async(dispatch)=>{
    try {
        // console.log("hi")
        dispatch({type:"loginRequest"});
        // console.log(email)

        const {data} = await axios.post(`${server}/user/login`,{email,password},
        {
            headers:{
                "Content-type":"application/json"
            }
        }
        );
        console.log(data)
        dispatch({type:"loginSuccess", payload: data});
        console.log(data)
    } catch (error) {
        dispatch({type:"loginFail",});
    }
};