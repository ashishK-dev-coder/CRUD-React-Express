import { useState } from "react";
import {Modal,Button} from "react-bootstrap"
import postService from "../../services/postService";


function UpdateModalComponent(props){

    const [isShow, invokeModal] = useState(false)

    const initModal = () => {
        return invokeModal(!isShow)
    }

    // form updation data
    const [title,setTitle] = useState(props.title)
    const [date,setDate] = useState(props.date)
    const [id,setId] = useState(props.id)
    const [selectedFile,setSelectedFile] = useState('')

    console.log(title)
    console.log(date)
    console.log(id)
    console.log(selectedFile)

    const handleSubmit = async(event) => {
        event.preventDefault()

        const formData = new FormData()

    if(selectedFile == '' && selectedFile.length == 0 ){

        formData.append('id',id)
        formData.append('title',title)
        formData.append('date',date)
    }

    // else (selectedFile !== '' && selectedFile.length !== 0)
    else{
        formData.append('id',id)
        formData.append('title',title)
        formData.append('date',date)
        formData.append("image",selectedFile)
        }

        const response = await postService.update(formData)

        if(response.data.success == true){
            alert(response.data.msg)
        }
        else (
            alert(response.data.msg)
        )
    }
    return (
        <>

        <Button variant="success" onClick={initModal}>
            Edit
        </Button>        

    <Modal show={isShow}>
            <Modal.Header closeButton onClick={initModal} >
                <Modal.Title>Update Post</Modal.Title>
            </Modal.Header>
        <form onSubmit={handleSubmit}>

            <Modal.Body>
                <input type="text"
                        name='title'
                        placeholder="Enter Post Title"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        required/>
                        <br/><br/>
                <input type="date"
                        name='date'
                        value={date}
                        onChange={event => setDate(event.target.value)}
                        required/>
                        <br/><br/>     
                <input type="file"
                        name='file'
                        onChange={event => setSelectedFile(event.target.files[0])}
                        required/>
                        <br/><br/>           
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={initModal}>
                    Close
                </Button>
                <Button type='submit' variant="dark" onClick={initModal}>
                    Update
                </Button>
            </Modal.Footer>
        </form>
    </Modal>
        
        </>
    )
}



export default UpdateModalComponent