function LabelNormal({
    el_Icon
})
{
    return(
        <div className="container-labelNormal">
            <div className="body-labelNormal">
            {
            el_Icon?(
                <div className="container-label container-label_withIcon">           
                <div src="" alt="" className="img-label_withIcon">
                    {el_Icon}
                </div>
                </div>
            ):''
        }
            </div>
        </div>
    )
}
export default LabelNormal;