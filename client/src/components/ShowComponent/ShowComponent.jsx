import { useState , useEffect } from "react"
import postService from '../../services/postService'
import UpdateModalComponent from "../UpdateModel/UpdateModelComponent"

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

function ShowComponent (){

    const [posts , setPosts] = useState({})

    const fetchPosts = async() => {
        setPosts(await postService.getPosts())
    }

        useEffect(()=>{
            fetchPosts()
        },[])

        const deletePost = async(id,e) =>{
            let response = await postService.deletePost(id)
            if(response.data.success == true){
                alert(response.data.msg)
               document.getElementById(id).parentElement.parentElement.remove()
            //    document.getElementById(id).parentElement.removeChild(document.getElementById(id));
            }else{
                alert(response.data.msg)
            }
        }


    return (
        <div className="App">
            <h2>Show Posts</h2>
            {posts.data != undefined && posts.data.data.length > 0 && (

                <table style={{width:'100%'}} border='1' color="black">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Image</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.data.data.map(post=>(
                        <tr key={post._id}>

                            <td >{post.title}</td>
                            <td>{post.date}</td>
                            <td>
                                <img src={'http://127.0.0.1:5000/api/postImages/'+post.image} style={{width:'100px',height:'100px'}}/>
                            </td>
                            <td>
                                <button id={post._id} onClick={(e)=> deletePost(post._id,e)}>Delete</button>
                            </td>
                            <td>
                                <UpdateModalComponent id={post._id} title={post.title} date={post.date} />
                            </td>

                        </tr>

                       ))}
                    </tbody>
                </table>

            )}


        </div>
    )
}

export default ShowComponent