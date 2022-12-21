import { MemoryRouter, Navigate, Outlet, Route, Routes, useNavigate} from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'
import SubContentPersonal from '../../subContents/subContentPersonal/SubContentPersonal'
import PagePersonalStyles from  '../pagePersonal/PagePersonal.module.css'
import { Fragment, useEffect, useState } from 'react'
import PagePersonalHeader from '../../subHeaders/pagePersonalHeader/PagePersonalHeader'
import { HOST_SERVER } from '../../../../config'
import { createContext } from 'react'
import { NoResult } from '../../inputs/forms/formSearch/FormSearch'

import AccountAPI from '../../../../API/AccountAPI';
import Users_Activity from '../../../../API/Users_Activity';
import { useStore } from "../../../../store/";
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
            // console.log(slugs);
            if(slugs)
            {
            fetch(`${HOST_SERVER}/${slugs.map(slug=>slug).join('/')}`,{
                method:'GET',
                credentials:'include',
              }).then(res=>res.text()).then(dataJSON=>{
                var data = JSON.parse(dataJSON);
                navigate(`/${slugs.map(slug=>{
                    return slug}).join('/')}`,{replace:true})
                    if(data.result)
                    {
                        set_stateAccount(Object.assign({id_chatPersonalPage:data.id_chatPersonalPage},data.result)) 
                    }
              })
            }
        }

         fetchAPI();
    },[])
    const [user, set_user] = useState({})
    const [state, dispatch] = useStore();
    const [user_activity, set_user_activity] = useState({})

    const [check_list_image, set_check_list_image] = useState(false)

    useEffect(() => {
       
        const fetchData = async () => {

            const response = await AccountAPI.getId(state.account._id)

            set_user(response)

        }

        fetchData()

    }, [state.account._id])

    useEffect(() => {

        const fetch_users_activity = async () => {

            const response = await Users_Activity.get_Users_Activity(state.account._id)
            console.log(response)

            set_user_activity(response)

            if (response.list_image.length > 0) {
                set_check_list_image(true)
            } else {
                set_check_list_image(false)
            }

        }

        fetch_users_activity()

    }, [state.account._id])
    return(
        // <BrowserRouter key={3}>

            <Fragment>
                {stateAccount?(<Context_PagePersonal.Provider 
            value={{stateAccount,set_stateAccount,slugs,stateAccount:stateAccount}}
            >
                <div className={PagePersonalStyles["container-pagePersonal"]}>
            <div className={PagePersonalStyles["main-pagePersonal"]}>
                <div className={PagePersonalStyles["body-pagePersonal"]}>
                    <div className={PagePersonalStyles["header-pagePersonal"]}>
                        {stateAccount&&<PagePersonalHeader stateAccount={stateAccount}/>}
                    </div> 
                    <div className={PagePersonalStyles["content-pagePersonal"]}>
                        {/* <Outlet/> */}
                        {
                            user_activity.list_image && user_activity.list_image.map(value => (
                                <div className={PagePersonalStyles["content-pagePersonal-post-img"]} key={value.id_image_post}>
                                    <Link to={`/post/${value.id_image_post}_${user_activity.id_user}`}><img src={value.image_body} alt="" className={PagePersonalStyles["image_personal_all"]} /></Link>
                                </div>
                            )
                            )
                        }
                        
                    </div>
                    <div className="text-center" style={{ color: 'gray', textAlign:'center' }}>----- © Website Social - Music -----</div>
                </div>      
            </div>
        </div>
            </Context_PagePersonal.Provider>):<NoResult />}
            </Fragment>
        // </BrowserRouter >
    ) 
}
export default PagePersonal