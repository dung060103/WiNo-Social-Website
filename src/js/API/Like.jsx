import { HOST_SERVER } from '../config';
import axios from 'axios';


const Like = {

    post_like: async(query) => {
        const url = `${HOST_SERVER}/like/${query}`
        var data = await fetch(url, {method:'POST'}).then(res=>res.json());
        return data ;
    },

    put_unlike: (query) => {
        const url = `${HOST_SERVER}/like/${query}`
        var data =  axios.put(url,).then(function (res) {
            console.log(res);
        });
        return data 
    },

    checking_like: async(query) => {
        const url = `${HOST_SERVER}/like/checking${query}`
        var data = await fetch(url, {method:'GET'}).then(res=>res.json());
        return data 
    },

    count_like: async(query) => {
        const url = `${HOST_SERVER}/like/${query}`
        var data = await fetch(url, {method:'GET'}).then(res=>res.json());
        return data 
    },


}

export default Like