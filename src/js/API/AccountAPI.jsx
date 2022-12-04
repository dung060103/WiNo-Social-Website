import { HOST_SERVER } from '../config';
import axiosClient from './axiosClient'

const AccountAPI = {

    getAll: () => {
        const url = `/account`
        return axiosClient.get(url)
    },

    getId: (id) => {
        const url = `/account/${id}`
        return axiosClient.get(url)
    },

    search_Accounts:async (query) => {
        const url = `${HOST_SERVER}/account/search/keyword${query}`
        console.log(url)
        // return await axiosClient.get(url)
        var data = await fetch(url).then(res=>res.json());
        return data ;
    },


}

export default AccountAPI