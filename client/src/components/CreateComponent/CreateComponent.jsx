import React , {useState} from 'react'
import postService from '../../services/postService'
import './Create.css'

function CreateComponent(){

    const [title,setTitle] = useState('')
    const [date,setDate] = useState('')
    const [image,setImage] = useState('')
    const [message,setMessage] = useState('')


    console.log(title,date,image)

    const handleSubmit = async (event) => {
        event.preventDefault();

    const formData = new FormData()

        formData.append('title',title)
        formData.append('date',date)
        formData.append('image',image)

        try {
            const response = await postService.create(formData);
            console.log('Full response:', response);  // Log the entire response
            console.log('Response data:', response.data);  // Log specifically the 'data' property
            event.target.reset();
            alert("Post Created")
        } catch (error) {
            console.error('Error creating post:', error);

    //     const response = await postService.create(formData)
    //     console.log(response)
    //     event.target.reset();
    // 
        }}

    return (
        <div>
            <h2> Create Post </h2>
            <form onSubmit={handleSubmit}> 
                <input type='text' 
                    name='title' 
                    placeholder='Enter post title'
                    onChange={event => setTitle(event.target.value)}
                    required/>
                <br/><br/>  
                <input type='date' 
                    name='date'
                    onChange={event => setDate(event.target.value)}
                    required/>
                <br/><br/>    
                <input type='file' 
                    name='image'
                    onChange={event => setImage(event.target.files[0])}
                    required/>
                <br/><br/>  
                <button>Submit</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default CreateComponent