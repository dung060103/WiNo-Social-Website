import axios from 'axios';
import { HOST_SERVER } from '../config';

const Users_Activity = {

    get_Users_Activity: async(id) => {
        const url = `${HOST_SERVER}/users_activity/${id}`
        var data = await fetch(url,{method:'GET'}).then(res=>res.json());
        return data ;
    },

    post_Activity_Following: async(query) => {
        const url = `${HOST_SERVER}/users_activity/following/${query}`
        var data = await fetch(url,{method:'POST'}).then(res=>res.json());
        return data ;
    },

    delete_Activity_Unfollowing: (query) => {
        const url = `${HOST_SERVER}/users_activity/unfollowing/${query}`
        var data =  axios.delete(url,).then(function (res) {
            console.log(res);
        });
        return data ;
    },

    detail_Post: async(query) => {
        const url = `${HOST_SERVER}/users_activity/${query}`
        var data = await fetch(url,{method:'GET'}).then(res=>res.json());
        return data ;
    },

    delete_Post: (query) => {
        const url = `${HOST_SERVER}/users_activity/delete/post${query}`
        var data =  axios.delete(url,).then(function (res) {
            console.log(res);
        });
        return data ;
    }

}

export default Users_Activity