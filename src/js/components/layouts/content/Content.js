import { useStore } from "../../../store";
import { Icon_Plus } from "../../parts/icons/fontAwesome/FontAwesome";
import LabelCircle from "../../parts/labels/labelCircle/LabelCircle";
function Content(
    {
        bodyContent=''
    }
    )
    {
        var [state,dispatch] = useStore();
    return(
        <div className='content'>
        <div className="container-popup_Content">
            {state.popUpContents.map((el,idx)=>{
                return( <div key={idx}>
                    {el}
                </div>)
            })}
        </div>  
        <div className="container-popup_Messenger">
            {state.popUpMessengers.map((el,idx)=>{
                return( <div key={idx}>
                    {el}
                </div>)
            })}
            {state.popUpMessengers.length>0&& <div style={{position:'absolute',
        bottom:0,right:0}}><LabelCircle el_Icon={<Icon_Plus />} /></div>}
        </div>
        {state.popUpReviews.length>0 && <div className="container-popup_Review">
            {state.popUpReviews.map((el,idx)=>{
                return( <div key={idx}>
                    {el}
                </div>)
            })}
        </div>}
        {bodyContent}
    </div>
    )
}
export default Content;