import React from 'react'
import './StoryReel.css'
import Story from './Story'

export default function StoryReel() {
  return (
    <div className="storyReel">
      <Story
        profileSrc={
          'https://media.istockphoto.com/id/1279654034/photo/studio-microphone-and-pop-shield-on-mic-in-the-empty-recording-studio-with-copy-space.jpg?s=612x612&w=0&k=20&c=hoYDQnNkbwHr4fXKz1eRyxTAXwGZeNvBEKBLqpX-DLg='
        }
        image={
          'https://img.pikbest.com/backgrounds/20190610/gif-creative-music-stage-lighting-dynamic-background_2829283.jpg!w700wp'
        }
        title={'Singer'}
      />
      <Story
        profileSrc="https://drive.google.com/uc?export=view&id=1ONQ1Mdw14u4gMRyHZSd37cbmfSH-UYlX"
        image="https://cdn.sharechat.com/51c1b68_1623750415234_sc.gif"
        title="Minh Dũng"
      />
      <Story
        profileSrc="https://upanh123.com/wp-content/uploads/2020/12/hinh-anh-den19-577x1024.jpg"
        image="https://haycafe.vn/wp-content/uploads/2022/08/anh-GIF-buon-ngu-quen-tren-tau-cao-toc.gif"
        title="Mạnh Nhật"
      />
      <Story
        profileSrc="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/8/21/829850/Bat-Cuoi-Truoc-Nhung-07.jpg"
        image="https://i.pinimg.com/originals/e6/40/53/e64053d136c5d63553cf61fa9caa6aaa.gif"
        title="Văn Viên"
      />
      <Story
        profileSrc="https://demoda.vn/wp-content/uploads/2022/02/anh-chat-nhat.jpg"
        image="https://media.tenor.com/0hjOGLFaQa0AAAAd/lofi-girl-lofi.gif"
        title="Thanh Tùng"
      />
    </div>
  )
}
