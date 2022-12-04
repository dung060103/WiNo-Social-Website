import HeaderSpaceBetweenStyles from "../headerSpaceBetween/HeaderSpaceBetween.module.css";
function HeaderSpaceBetween({ bodyLeft, bodyRight }) {
  return (
    <div className={HeaderSpaceBetweenStyles['body_headerSpaceBetween']}>
      <div className="bodyLeft_headerSpaceBetween">
        {bodyLeft}
      </div>
      <div className={HeaderSpaceBetweenStyles["bodyRight_headerSpaceBetween"]}>
        {bodyRight}
      </div>
    </div>
  );
}
export default HeaderSpaceBetween;
