import LogoWebsiteStyles from '../../logo/logoWebsite/LogoWebsite.module.css'
function LogoWebsite()
{
    console.log(LogoWebsiteStyles);
    return (
        <div className={LogoWebsiteStyles["container-logo_website"]}>
            <div className={LogoWebsiteStyles["body-logo_website"]}>
                <i className="fa-solid fa-radio"></i>
            </div>
        </div>
    )
}
export default LogoWebsite;