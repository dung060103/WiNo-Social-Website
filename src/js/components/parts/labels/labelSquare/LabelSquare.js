import OverLay from '../../overlays/OverLay';
import './LabelSquare.css'
function LabelSquare({el_Icon, urlImg,urlVideo,elOverlay, sizeLabel='MEDIUM',
    elSub, isBorderRadius=true,
  tooltip
  }) {
  return (
    <div className="container-labelSquare" title={tooltip}>
      <div className="main-labelSquare">
        <div className={"body-labelSquare"+' '+sizeLabel+ ' ' +(isBorderRadius && 'isBorderRadius')}>
            <OverLay>{elOverlay}</OverLay>
            {el_Icon && <div className='icon-labelSquare'>{el_Icon}</div>}
            {elSub && <div className='sub-labelSquare'>{elSub}</div>}
            {urlImg && <div className='img-labelSquare'><img src={urlImg} alt=""/></div>}
            {urlVideo && <div className='video-labelSquare'><video src={urlVideo} alt=""/></div>}
        </div>
      </div>
    </div>
  );
}
export default LabelSquare;
