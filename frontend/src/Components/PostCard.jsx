import React, { useState, useEffect } from 'react';
import {Card} from 'react-bootstrap'
import {AiTwotoneHeart} from 'react-icons/ai'
import {FcLike,FcComments} from 'react-icons/fc'
import {BiComment} from 'react-icons/bi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import CommentForm from '../Components/CommentForm'
import http from '../AxiosConfig/AxiosSettings'
import urls from '../urls.json'
import CommentCard from '../Components/CommentCard'

const styles = {
  iconLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  likeIcon: {
    width: '6%', 
    height: '6%',
    
  },
  commentIcon: {
    width: '6%',
    height:'6%',
    marginLeft: '8%'
  },
  deleteIcon: {
    width: '6%',
    height:'6%',
    marginLeft: '8%'
  },
  PostLayout: { 
    width: '40%', 
    height: '40%', 
    marginTop: '2%'
  },
 
}
const PostCard = (props) => {
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentList, setComments] = useState([])
    const [description, setDescription] = useState('')
    const {authorName, comments,imageLink,likes,title,postID,currentUser} = props.info
    const {userAccessed,deletePost} = props 
    useEffect(() => {
      setComments(comments)
      setInitalLiked()
    }, []);
    const setInitalLiked = () => {
      if(likes.includes(currentUser)) setLiked(true)
      else setLiked(false)
    }
    const submitForm = async () => {
      let obj = {by : 'By You', comment: description}
      let tempList = [...commentList]
      tempList.push(obj)
      setComments([...tempList])
      await http.put(urls.putComment, {postID,description})
    }
    const updateLike = async () => {
      const like = !liked
      setLiked(!liked)
      await http.put(urls.updateLike, {liked: like, postID})
      
    }
    const {iconLayout,likeIcon,commentIcon,PostLayout,deleteIcon} = styles
    return (
      <React.Fragment>
          <Card
            bg='dark'
            text= 'white'
            style={PostLayout}
            className="mx-auto"
          >
            <Card.Body>
              <Card.Title> {title} </Card.Title>
              <Card.Subtitle className="mb-2" style = {{color: '#bdbbbb'}}>{authorName}</Card.Subtitle>
              <Card.Img variant = 'top' src = {imageLink} width = '40%'/>
              <Card.Text>
                {props.info.description}
              </Card.Text>
              <div className = 'mx-auto' style = {iconLayout}>
              {
                liked ? 
                    <FcLike style = {likeIcon} onClick = {updateLike} />:
                    <AiTwotoneHeart style = {likeIcon} onClick = {updateLike} />  
              }
              {
                showComments ?
                    <FcComments style = {commentIcon} onClick = {() => setShowComments(!showComments)} /> : 
                    <BiComment  style = {commentIcon} onClick = {() => setShowComments(!showComments)} />       
              }
              {userAccessed ? <RiDeleteBin6Line style = {deleteIcon} onClick = {() => deletePost(postID)} /> : null }
              
              </div>
            </Card.Body>
          </Card>
          {
            showComments ? 
            <> 
            <CommentForm setDescription ={setDescription} submitForm = {submitForm} />
            {commentList.map(comment => <CommentCard comment = {comment} />)}
             </>
            : null
          }
          
          
      </React.Fragment>
    

     );
}
 
export default PostCard;