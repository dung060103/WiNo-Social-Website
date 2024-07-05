import { useStore } from '../../../../store/hooks';
import ItemOptStyles from '../itemOpt/ItemOpt.module.css';
export const constant_ItemOpt = {
  TYPE_ITEM_OPT: {
    NORMAL: 'NORMAL',
    CONFIRM: 'CONFIRM',
  },
};
function ItemOpt({
  TYPE_ITEM_OPT = constant_ItemOpt.TYPE_ITEM_OPT.NORMAL,
  component_Left,
  children_centerItemOpt,
  component_Right,
  component_Sub,
  handleClick = () => {
    console.log('CLICK!!!');
  },
}) {
  const [state, dispatch] = useStore();
  return (
    <div
      className={ItemOptStyles['container-itemOpt']}
      onClick={(event) => {
        handleClick(event, state);
      }}
    >
      <div className={ItemOptStyles['main-itemOpt']}>
        <div className={ItemOptStyles['body-itemOpt']}>
          <div className={ItemOptStyles['left-itemOpt']}>
            {component_Left ? (
              <div className={ItemOptStyles['childrenLeft-itemOpt']}>
                {component_Left}
              </div>
            ) : (
              ''
            )}
            {children_centerItemOpt ? (
              <div className={ItemOptStyles['childrenCenter-itemOpt']}>
                {children_centerItemOpt}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className={ItemOptStyles['center-itemOpt']}>
            {/* {el_subTextItem ? <div className={ItemOptStyles["subText-itemOpt"]}>{el_subTextItem}</div> : ""} */}
          </div>
          {component_Right ? (
            <div className={ItemOptStyles['summary-itemOpt']}>
              {component_Right}
            </div>
          ) : (
            ''
          )}
        </div>
        {component_Sub ? (
          <div className={ItemOptStyles['sub-itemOpt']}>{component_Sub}</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
export default ItemOpt;
