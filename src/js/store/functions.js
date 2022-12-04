import { HOST_SERVER } from "../config";
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
}