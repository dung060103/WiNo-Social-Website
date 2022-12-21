import { HOST_SERVER } from '../config';

const Comment = {

    get_all_comment: async(id) => {
        const url = `${HOST_SERVER}/comment/${id}`
        var data = await fetch(url, {method:'GET'}).then(res=>res.json());
        return data ;
    },

    post_comment: async(query) => {
        const url = `${HOST_SERVER}/comment/${query}`
        var data = await fetch(url, {method:'POST'}).then(res=>res.json());
        return data ;
    },


}

export default Comment