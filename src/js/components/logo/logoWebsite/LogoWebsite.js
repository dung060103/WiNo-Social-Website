import { Link } from 'react-router-dom'
import LogoWebsiteStyles from '../../logo/logoWebsite/LogoWebsite.module.css'
function LogoWebsite() {
  return (
    <Link to={'/'}>
      <div className={LogoWebsiteStyles['container-logo_website']}>
        <div className={LogoWebsiteStyles['body-logo_website']}>
          <i className="fa-solid fa-radio"></i>
        </div>
      </div>
    </Link>
  )
}
export default LogoWebsite
