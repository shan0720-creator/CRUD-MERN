import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import Modal from "react-bootstrap/Modal"



function Posts(){
    const navigate = useNavigate();
     const [posts,setPosts] = useState([]);
     const [updatedPost,setUpdatedPost] = useState({})
     const [show,setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);
    useEffect(()=>{
        axios.get("/posts").then((res)=>{console.log(res); setPosts(res.data);}).catch((err)=>console.log(err))
    }, [])
    const deletePost = (id)=>{
        axios.delete(`/delete/${id}`).then((res)=>console.log(res)).catch((err)=>console.log(err));
       window.location.reload();
    };
    const updatePost = (post)=>{
        setUpdatedPost(post);
        handleShow();
    };

    const handleChange = (e)=>{
        const{name,value} = e.target;
    setUpdatedPost(prev=>{
       return {
        ...prev,
        [name]: value,
       }
    })
    };

    const saveUpdatedPost = (e)=>{
        axios.put(`/update/${updatedPost._id}`,updatedPost).then(res=>console.log(res)).catch(err=>console.log(err))
        handleClose();
        window.location.reload();
    };
    return (
        <div style={{width:"90%", textAlign: "center", margin: "auto auto"}}>
            <h1>Posts page</h1>
            <Button style={{width:"100%",marginBottom:"1rem"}} variant="outline-dark" onClick={()=>navigate(-1)}>Back</Button>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body><Form>

            </Form>
            <Form.Group>
             <Form.Control style={{marginBottom:"1rem"}} placeholder="title" name="title" value={updatedPost.title ? updatedPost.title :""} onChange={handleChange}/>
             <Form.Control name="description" value={updatedPost.description ? updatedPost.description :""} placeholder="description" onChange={handleChange}/>
            
            </Form.Group>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            {posts?(
               <>
                 {posts.map((post)=>{
                    return (
                        <div key={post._id} style={{border:"solid lightgray 1px", borderRadius: "8px",marginBottom: "1rem"}}>
                            <h4>{post.title}</h4>
                            <p>{post.description}</p>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                            <Button variant="outline-info" onClick={()=>updatePost(post)} style={{width:"100%",marginRight:"1rem"} }>UPDATE</Button>
                            <Button onClick={()=>deletePost(post._id)} variant="outline-danger" style={{width:"100%"}}>DELETE</Button>

                            </div>
                        </div>
                    )
                 })}
               </>
            ):""}
        </div>
    )
}

export default Posts;
