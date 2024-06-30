import { useStore } from "../../../../store";
import { delete_popup_review } from "../../../../store/actions";
import { Icon_Close } from "../../../parts/icons/fontAwesome/FontAwesome";
import PopUp_ from "../popup";
import './PopUpReviews.css'
function PopUpReviews({
    titlePopUp,
    contentPopUp
}) {
    const [state,dispatch] = useStore()
  return (
    <PopUp_ work_case_unmount={()=>{
        dispatch(delete_popup_review(null));
    }}>
        <div className="container-popUpReviews">
      <div className="main-popUpReviews">
        <div onClick={(event)=>{
            dispatch(delete_popup_review(null));
        }} 
        className="btnClose-popUpReviews"><Icon_Close /></div>
        <div className="body-popUpReviews">
          <div className="header-popUpReviews">
            <div className="title-popUpReviews">{titlePopUp}</div>
          </div>
          <div className="content-popUpReviews">
            {contentPopUp}
          </div>
        </div>
      </div>
    </div>
    </PopUp_>
  );
}
export default PopUpReviews
