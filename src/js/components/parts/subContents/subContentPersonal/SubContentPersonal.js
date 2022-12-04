import SubContentPersonalStyles from  '../subContentPersonal/SubContentPersonal.module.css'
function SubContentPersonal(
    {
        data=''
    }
)
{
    return(<div className={SubContentPersonalStyles['container-subContentPersonal']}>
{data}
    </div>) 
}
export default SubContentPersonal;