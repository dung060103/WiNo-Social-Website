import { MemoryRouter, Navigate, Outlet, Route, Routes, useNavigate} from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'
import SubContentPersonal from '../../subContents/subContentPersonal/SubContentPersonal'
import PagePersonalStyles from  '../pagePersonal/PagePersonal.module.css'
import { useEffect, useState } from 'react'
import PagePersonalHeader from '../../subHeaders/pagePersonalHeader/PagePersonalHeader'
import { HOST_SERVER } from '../../../../config'
import { createContext } from 'react'
export const Context_PagePersonal = createContext();
function PagePersonal(
    {
        elContent,
        slugs
    }   
)
{
    const [stateAccount,set_stateAccount]= useState(null)
    const navigate = useNavigate(); 
    useEffect(()=>{

        var fetchAPI =async ()=>{
            console.log(slugs);
            if(slugs)
            {
            fetch(`${HOST_SERVER}/${slugs.map(slug=>slug).join('/')}`,{
                method:'GET',
                credentials:'include',
              }).then(res=>res.text()).then(dataJSON=>{
                var data = JSON.parse(dataJSON);
                navigate(`/${slugs.map(slug=>{
                    return slug}).join('/')}`,{replace:true})
                set_stateAccount(Object.assign({id_chatPersonalPage:data.id_chatPersonalPage},data.result)) 
              })
            }
        }

         fetchAPI();
    },[])
    return(
        // <BrowserRouter key={3}>

            <Context_PagePersonal.Provider 
            value={{stateAccount,set_stateAccount,slugs}}
            >
                <div className={PagePersonalStyles["container-pagePersonal"]}>
            <div className={PagePersonalStyles["main-pagePersonal"]}>
                <div className={PagePersonalStyles["body-pagePersonal"]}>
                    <div className={PagePersonalStyles["header-pagePersonal"]}>
                        {stateAccount&&<PagePersonalHeader stateAccount={stateAccount}/>}
                    </div> 
                    <div className={PagePersonalStyles["content-pagePersonal"]}>
                        <Outlet/>
                    </div>
                </div>      
            </div>
        </div>
            </Context_PagePersonal.Provider>
        // </BrowserRouter >
    ) 
}
export default PagePersonal