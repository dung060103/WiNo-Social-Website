import { HOST_SERVER } from '../config';

const Users_Home = {

    get_Users_Home: async (query) => {
        const url = `${HOST_SERVER}/users_home${query}`
        var data = await fetch(url,{method:'GET'}).then(res=>res.json());
        return data ;
    },

    post_Status_User: async (query) => {
        const url = `${HOST_SERVER}/users_home/post${query}`
       var data = await fetch(url, {method:'POST'}).then(res=>res.json());
       return data ;
    }

}

export default Users_Home