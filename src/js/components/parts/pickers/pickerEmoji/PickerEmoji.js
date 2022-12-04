import EmojiPicker from "emoji-picker-react";
import './PickerEmoji.css'

function PickerEmoji(
    {
        handleClickPicker=(event,emojiData)=>{},
        styles={}
    }
)
{
    return (
        <div className="body-pickerEmoji"
        style={{...styles,
            position: "absolute",
            boxShadow: "1px 1px 25px 2px var(--greenColorHot)",
          }}
        >
            <EmojiPicker
                pickerStyle={{
                  width: "100%",
                  height: "100%",
                  background: "var(--greenColorEnd_Background)",
                }}
                onEmojiClick={(event, emojiData) => {
                    handleClickPicker(event,emojiData)
                }}
              />

        </div>
    )
}

export default PickerEmoji