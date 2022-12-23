import axiosClient from './axiosClient'
import { HOST_SERVER } from '../config';
const Following = {

    get_following: async(id) => {
        const url = `${HOST_SERVER}/following/${id}`
        var data = await fetch(url, {method:'GET'}).then(res=>res.json());
        return data ;
    },

    get_status_following: async(query) => {
        const url = `${HOST_SERVER}/following/${query}`
        var data = await fetch(url, {method:'GET'}).then(res=>res.json());
        return data ;
    },

    post_status_following: async(query) => {
        const url = `${HOST_SERVER}/following/${query}`
        var data = await fetch(url, {method:'POST'}).then(res=>res.json());
        return data ;
    },


}

export default Following