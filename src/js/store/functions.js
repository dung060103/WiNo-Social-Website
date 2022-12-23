import React, {useState} from "react";
import { HOST_SERVER } from "../config";
import queryString from 'query-string'
import Users_Activity from '../API/Users_Activity';
import Following from '../API/Following';
import { useParams } from "react-router";
export function singleObj_constructor_toList(obj)
{
  var init=[];
  init.push(obj);
  return init;
}
export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
export function dateTo_textAgo(date)
{
  var subtract = Math.abs(new Date() - date)
  if(subtract<60*1000)
  {
    return `${parseInt(subtract/1000)} seconds ago`
  }
  else if(subtract>60*1000&&subtract<60*60*1000)
  {
    return `${parseInt(subtract/1000/60)} minutes ago`
  }
  else if(subtract>60*60*1000&&subtract<24*60*60*1000)
  {
    return `${parseInt(subtract/1000/60/60)} hours ago`

  }
  else if(subtract>24*60*60*1000&&subtract<7*24*60*60*1000)
  {
    return `${parseInt(subtract/1000/60/60/24)} days ago`

  }
  else if(subtract>7*24*60*60*1000)
  {
    return `${parseInt(subtract/1000/60/60/24/7)} weeks ago`
  }
  else if(subtract>30*24*60*60*1000)
  {
    return `${parseInt(subtract/1000/60/60/24/30)} months ago`
  }
  return "AAAAAAAAA"
}
export function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return 'n/a';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i == 0) return bytes + ' ' + sizes[i];
  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};
export function get_slug(url){return new URL(url).pathname.match(/[^\/]+/g);}
export function req_requestAddFriend(account)
{
  fetch(`${HOST_SERVER}/friend/requestAddFriend`,{
    method:'POST',
    body:JSON.stringify({
      slug_friend:account.slug_personal
    }),
    credentials:'include',
    headers:{
      'Content-Type':'application/json'
    }
  })
}
export const req_remove_requestAddFriend = (account)=>{
  fetch(`${HOST_SERVER}/friend/remove_requestAddFriend`,{
    method:'POST',
    body:JSON.stringify({
      slug_friend:account.slug_personal
    }),
    credentials:'include',
    headers:{
      'Content-Type':'application/json'
    }
  })
}
export const req_refuse_requestAddFriend = (account)=>{
  console.log(account.slug_personal);
  fetch(`${HOST_SERVER}/friend/refuse_requestAddFriend`,{
    method:'POST',
    body:JSON.stringify({
      slug_friend:account.slug_personal
    }),
    credentials:'include',
    headers:{
      'Content-Type':'application/json'
    }
  })
}
export const req_unfriend = (account)=>{
  // Lấy id params
  

  fetch(`${HOST_SERVER}/friend/unfriend`,{
    method:'POST',
    credentials:'include',
    body:JSON.stringify({
      slug_unfriend:account.slug_personal
    }),
    headers:
    {
      'Content-Type':'application/json'
    }
  })
}
export function req_acceptAddNewFriend(account)
{
  // const [user_activity, set_user_activity] = useState({})
  // const { id} = useParams();
  console.log('????');
  fetch(`${HOST_SERVER}/friend/acceptAddNewFriend`,{
    method:'POST',
    credentials:'include',
    body:JSON.stringify({
      data_res_new_friend:account.slug_personal
    }),
    headers:{
      'Content-Type':'application/json'
    }
  })
  
  const fetchData = async (id) => {

    const params = {
        id_user: account._id,
        id_user_following: id
    }

    const query = '?' + queryString.stringify(params)

    // Gọi tới API của controller Following
    const response = await Following.post_status_following(query)
    console.log(response)

    GET_API_activity()

    POST_API_Activity_Following()

  }
fetchData()
  async function GET_API_activity(id) {

  const response_GET = await Users_Activity.get_Users_Activity(id)

  // set_user_activity(response_GET)

}

async function POST_API_Activity_Following(account,id) {

  const params = {
      id_user: account._id,
      id_user_following: id
  }

  const query = '?' + queryString.stringify(params)

  const response = await Users_Activity.post_Activity_Following(query)
  console.log(response)

}
}


// Hàm này dùng để gọi là API của database user_activity

    // Hàm này dùng để gọi API create database
    