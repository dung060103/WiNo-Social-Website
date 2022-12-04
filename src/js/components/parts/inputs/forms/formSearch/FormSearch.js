import React, {useState, useRef} from "react";
import FormSearchStyles from '../formSearch/FormSearch.module.css'
import PropTypes from 'prop-types';
 
FormSearch.propTypes = {
    handler_Search: PropTypes.func
};
 
FormSearch.defaultProps = {
    handler_Search: null
}
function FormSearch(props){
  const { placeholder_text } = props
  const { handler_Search } = props
 
  const [search, set_search] = useState('')
 
    const delaySearchTextTimeOut = useRef(null)
 
    const onChangeText = (e) => {
 
        const value = e.target.value
 
        set_search(value)
 
        if (handler_Search){
            //Nếu người dùng đang nhập thì mình clear cái giây đó
            if (delaySearchTextTimeOut.current){
                clearTimeout(delaySearchTextTimeOut.current)
            }
           
            delaySearchTextTimeOut.current = setTimeout(() => {
                handler_Search(value)
            }, 700)            
        }
 
    }
  return (
    <div className={FormSearchStyles['container-formSearch']}>
      <div className="btn-search__formSearch">
        <div className="icon-search__formSearch">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className={FormSearchStyles['container-ipt_search__formSearch']}>
        <input placeholder={placeholder_text} type="text"
        className={FormSearchStyles['ipt-search__formSearch']}
        value={search} onChange={onChangeText} ></input>
      </div>
    </div>
  );
}
export default FormSearch
