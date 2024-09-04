import './Feed.css'
import StoryReel from '../storyReel/StoryReel'
import MessageSender from '../messageSender/MessageSender'
import PostStatus from '../postStatus/PostStatus'
import { Box } from '@mui/material'

export default function Feed() {
  return (
    <div className="feed">
      <Box flex={4} p={{ xs: 0, md: 2 }}>
        <StoryReel />
        <MessageSender />
        <PostStatus
          avtar={
            'https://vivureviews.com/wp-content/uploads/2022/02/among-us-profile-picture.jpg'
          }
          title={'Among Us'}
          descr={'Noble'}
          date={'01-Feb-2022'}
          link={
            'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/306706683_1142337349698085_2245074020856781962_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=a4a2d7&_nc_ohc=XhqKxqO1YBMAX86Es0c&_nc_ht=scontent.fhan2-3.fna&oh=00_AfDq81mPhX0ao4sy8MgxlF8Ybppodi4hn6ddBDUaYxuOyg&oe=636728D3'
          }
        />
        <PostStatus
          avtar={''}
          title={'Lê Thổ'}
          descr={'Noble'}
          date={'01-Feb-2022'}
          link={
            'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/306706683_1142337349698085_2245074020856781962_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=a4a2d7&_nc_ohc=XhqKxqO1YBMAX86Es0c&_nc_ht=scontent.fhan2-3.fna&oh=00_AfDq81mPhX0ao4sy8MgxlF8Ybppodi4hn6ddBDUaYxuOyg&oe=636728D3'
          }
        />
      </Box>
    </div>
  )
}
