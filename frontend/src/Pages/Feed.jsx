import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar'
import commonStyles from '../Styles/CommonStyles'
import PostForm from '../Components/PostForm'
import {Jumbotron,Spinner} from 'react-bootstrap'
import http from '../AxiosConfig/AxiosSettings'
import urls from '../urls.json'
import PostCard from '../Components/PostCard'
import Alert from '../Components/Alert'
const Feed = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageLink, setImageLink] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPosts()
    }, []);

    const getPosts = async () => {
        const {data} = await http.get(urls.getPosts + "false") 
        const result = data.posts 
        await setPosts([...result])
        setLoading(false)
    }

    const onSubmit =  async() => {
        console.log({title,description,imageLink, length: title.length})
        if(title.length < 1) {
            setShowAlert(true)
            setAlertText('You have to enter a title')
            return
        }
        const submitObj = {title,description,imageLink}
        const {data} = await http.post(urls.createPost,submitObj)
        if(!data.valid) {
            setShowAlert(true)
            setAlertText('Invalid Image Link')
            return
        }
        let tempPosts = posts 
        tempPosts.push(data.post)
        await setPosts([...tempPosts])
    }

    const displayPosts = () => {
        return (
            <React.Fragment>
                <Alert 
                showAlert = {showAlert} 
                setShowAlert = {setShowAlert} 
                alertText = {alertText} 
                style = {{width: '30%'}}
                />
                 <PostForm 
                onSubmit = {onSubmit} 
                setTitle = {setTitle} 
                setDescription = {setDescription} 
                setImageLink = {setImageLink} 
                />
                {posts.map((post) => <PostCard info = {post} userAccessed = {false} />)}
            </React.Fragment>
        )
    }

    return ( 
        <React.Fragment>
            <Navbar />
            <Jumbotron fluid 
                style = {commonStyles.background}
            >

                {
                    loading ? <Spinner style = {{margin: '50%'}} animation="border" variant="danger" /> : null
                }
                {
                    !loading && displayPosts()
                }
               
            </Jumbotron>
        </React.Fragment>
     );
}
 
export default Feed;
