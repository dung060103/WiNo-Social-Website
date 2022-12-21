import SubContentPersonalStyles from  '../subContentPersonal/SubContentPersonal.module.css'
function SubContentPersonal(
    {
        slug_personal,optTab
    }
)
{
    if(optTab==='Friends')
    {
        console.log(slug_personal);
        // fetch();
       
    }
    return(<div className={SubContentPersonalStyles['container-subContentPersonal']}>
{slug_personal}
    </div>) 
}
export default SubContentPersonal;