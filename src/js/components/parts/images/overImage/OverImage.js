import '../../images/overImage/OverImage.css'
function OverImage({
    urlImage=''
})
{
    return (
        <div className="container-overImage">
        <img className='img-overImage' src={urlImage} alt="" />
        </div>
    )
}
export default OverImage;