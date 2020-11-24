import React, {useEffect,useState} from 'react'
import commonStyles from '../Styles/CommonStyles'
import Navbar from '../Components/Navbar.jsx'
import {Image,Spinner} from "react-bootstrap";
import urls from '../urls.json'
import http from '../AxiosConfig/AxiosSettings'
import PostCard from '../Components/PostCard'


const styles = {
    imageDiv: {
        width:'25%',
        height: '25%',
        marginLeft: '37.5%'
    },
    image: {
        marginLeft: '30%',
        marginTop: '5%'
    },
    nameLayout: {
        textAlign:'center',
        marginTop: '2%'
    }
}
const Profile = () => {
    const[userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(true)
    const [posts,setPosts] = useState([])
    const {background} = commonStyles
    const loadUserData = async () => {
        const {data} = await http.get(urls.getUser)
        const {investor} = data
        const {firstName, lastName, profileImg} = investor
        await setUserInfo({firstName, lastName, profileImg})
        const response = await http.get(urls.getPosts + "true")  
        await setPosts([...response.data.posts])
        await setLoading(false)
    }
    useEffect(() => {
        loadUserData()
    },[])

    const deletePost = async (postID) => {
        let newPosts = [] 
        for(let a = 0;a < posts.length;a++){
            if(posts[a].postID !== postID) newPosts.push(posts[a])
        }
        setPosts([...newPosts])
        await http.delete(urls.deletePost + postID)
    }
    const displayProfile = () => {
        return(
            <React.Fragment>
                <div style = {styles.imageDiv} >
                    <Image src= {profileImg} style = {styles.image} roundedCircle width = '40%' height = '40%' />
                </div>
                <h1 style = {{textAlign: 'center'}} >{firstName} {" "} {lastName}</h1>
                {posts.map((post) => <PostCard info = {post} userAccessed = {true} deletePost = {deletePost} />)}
            </React.Fragment>
        )
    }
    const {firstName, lastName,profileImg}= userInfo
    return (
        <React.Fragment>
            <Navbar />
            <div style={background}>
                {loading ? <Spinner style = {{margin: '50%'}} animation="border" variant="danger" /> : null }
                {
                    !loading && displayProfile()
                }
                



            </div>
        </React.Fragment>

    )


}

export default Profile