import "../overlays/OverLay.css";
function OverLay({ children }) {
return (  <div className="container-overLay">
    <div className="body-overLay">
    {children}
  </div>
  </div>)
}
export default OverLay;
