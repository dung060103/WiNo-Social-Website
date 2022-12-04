import NamePersonalStyles from '../namePersonal/NamePersonal.module.css'

function NamePersonal(
    {
        elOfficial=''
        ,textName
    }
)
{
    return (
        <div className={NamePersonalStyles['container-namePersonal']}>
            <div className={NamePersonalStyles['main-namePersonal']}>
                <div className={NamePersonalStyles['body-namePersonal']}>
                    {textName}
                </div>
                <div className={NamePersonalStyles['containerOfficial-namePersonal']}>
                {elOfficial}
                </div>
            </div>
        </div>
    )
}
export default NamePersonal