import React from 'react'
import './StoryReel.css'
import Story from './Story'

export default function StoryReel() {
  return (
    <div className="storyReel">
      <Story
        profileSrc="https://vivureviews.com/wp-content/uploads/2022/02/among-us-profile-picture.jpg"
        image="https://i.pinimg.com/originals/e0/87/74/e08774c0f31fad82357cc32ba472da2a.jpg"
        title="Among Us"
      />
      <Story
        profileSrc="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/278386410_1045624122702742_541271355845158208_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=KNH_i6ooFL8AX_39JrS&tn=FAGv5-wx9sGgLKd4&_nc_ht=scontent.fdad3-1.fna&oh=00_AfDu3HfYLtLoPnMEtD801fsg-nZfXybXPJA2s4Hq2aX5vQ&oe=6362C0D8"
        image="https://images.unsplash.com/photo-1599738001738-ab67bf681c07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2501&q=80"
        title="Nhật Đặng"
      />
      <Story
        profileSrc="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/311144887_844517903226379_4976552921111078215_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RB-2U2Yks7UAX9j6Uqi&_nc_ht=scontent.fdad3-1.fna&oh=00_AfBpKOVyRgzVBQcLEQYart9SRQhVeXG2Z-h2Yb49GXsnBA&oe=63625962"
        image="https://upload.wikimedia.org/wikipedia/commons/4/48/Kh%C3%A1nh_H%C3%B2a.png"
        title="Minh Dũng"
      />
      <Story
        profileSrc="https://miro.medium.com/max/2048/0*0fClPmIScV5pTLoE.jpg"
        image="https://lofita.vn/public/upload/files/dam-cuoi-khao-khat.jpg"
        title="Lê Thổ"
      />
      <Story
        profileSrc="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/308612942_1527410604354719_5861659556570704375_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LUZiSAVXfFAAX_TUqoR&tn=FAGv5-wx9sGgLKd4&_nc_ht=scontent.fdad3-4.fna&oh=00_AfD_qzm2lXknyNpgrDn7SrRPbvxHUNH5AFbKscHERX-gCQ&oe=63629017"
        image="https://haycafe.vn/wp-content/uploads/2022/03/hinh-nen-sad-boy-1.jpg"
        title="Tùng Trương"
      />
    </div>
  )
}
