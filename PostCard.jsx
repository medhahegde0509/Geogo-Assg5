import React, {useState, useEffect} from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CommentIcon from '@material-ui/icons/Comment'


import avatarImage from './media/postAvatar.jpg'

const useStyles = makeStyles({
	media: {
		height: 0,
		paddingTop: '50%',
	},
})


const PostCard = (props) => {
    const { Title,Description}=props
    const { media } = useStyles()
    const [posts,setData]=useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/posts')
        .then((response)=> {
            setData(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    },[])
    console.log(posts)
	return (
		<Card>
			<CardHeader
				avatar={<Avatar src={avatarImage} />}
				title='Medha Hegde'
				subheader={new Date().toDateString()}
				action={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
			/>
			<CardContent>
				<Typography variant='body2' color='textSecondary' component='p'></Typography>
                <h1>{Title}</h1>
        <h2>{Description}</h2>
        <h3>Assignment-5</h3>
        { posts.map(post => (
            <div>
                <h1>{post.title}</h1>
                <h2>{post.content}</h2>
                <h3>{post.author}</h3>
            </div>
            ))}
			</CardContent>

            <CardActions disableSpacing>
				<IconButton>
					<FavoriteIcon />
				</IconButton>
				<IconButton>
					<CommentIcon />
				</IconButton>
				<IconButton>
					<ShareIcon />
				</IconButton>
			</CardActions>
		</Card>
	)
}

export default PostCard