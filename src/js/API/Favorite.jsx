import { HOST_SERVER } from '../config';
import axios from 'axios';

const Favorite = {

    get_all_favorite: async(id) => {
        const url = `${HOST_SERVER}/favorite/${id}`
        var data = await fetch(url, {method:'GET'}).then(res=>res.json());
        return data ;
    },

    post_Favorite: async(query) => {
        const url = `${HOST_SERVER}/favorite/${query}`
        var data = await fetch(url, {method:'POST'}).then(res=>res.json());
        return data ;
    },

    delete_Favorite:(query) => {
        const url = `${HOST_SERVER}/favorite/${query}`
        var data =  axios.delete(url,).then(function (res) {
            console.log(res);
        });
        return data ;
    },

    put_Favorite: (query) => {
        const url = `${HOST_SERVER}/favorite/${query}`
        var data =  axios.put(url,).then(function (res) {
            console.log(res);
        });
        return data ;
    },

}

export default Favorite