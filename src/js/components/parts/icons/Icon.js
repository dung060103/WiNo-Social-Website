import './Icon.css'
import clsx from 'clsx'
import { SIZE_SMALL } from '../../../store/constants'
function Icon_({
    children,
    isHot=true,
    sizeIcon=SIZE_SMALL
})
{
    return (<div className={clsx("icon_web",{'isHot':isHot},sizeIcon)}>
        {children}
    </div>)
}
export default Icon_