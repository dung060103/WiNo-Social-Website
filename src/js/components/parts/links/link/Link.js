import clsx from 'clsx';

import LinkStyles from  '../link/Link.module.css';

function Link(
    {
        isUnderline=false
        ,text  
    }
)
{
    return(
        <div className={clsx(
            [
                LinkStyles.main_link 
            ]
        )}>
            <div className={clsx(
                
                    { text_link:LinkStyles.text_link ,
                        [LinkStyles.isUnderline] : isUnderline}
            )}>
                {text}
            </div>
        </div>
    );
}
export default Link;