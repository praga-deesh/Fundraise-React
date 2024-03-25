import { useState,useEffect } from "react";
import './CreatePost.css'
import 'bootstrap/dist/css/bootstrap.css';
import createPostService from "../services/CreatePostService";
;

function CreatePost() {

    let [fundraiser,setFundraiser] = useState({});

    useEffect(() => {

    //     const sessionData = {
    //         id : 52,
    //         name: 'FundraiserOne',
    //         email: 'f1@g.com',
    //         role: 'fundraiser',
    //         password: 'f1f1f1'
    //     };
    //     const dataString = JSON.stringify(sessionData);

    // // Add data to sessionStorage
    // sessionStorage.setItem('user', dataString);

        // Retrieve data from sessionStorage
        const storedFundraiser = sessionStorage.getItem('user');
        
        // Check if there is data in sessionStorage
        if (storedFundraiser) {
            // Parse the stored data and update the state
            const fundraiserData = JSON.parse(storedFundraiser);

            setFundraiser({
                id :fundraiserData.id,
                name : fundraiserData.name,
                email : fundraiserData.email,
                password : fundraiserData.password})
        }
        setPost({
            ...post,fundraiser:fundraiser
        })
    }, [post, fundraiser]); // Run the effect only once on component mount
    

    let [post, setPost] = useState({
        title: '',
        description: '',
        category:'food',
        startDate: '',
        endDate: '',
        amountRequested:0,
        amountCollected:0,
        status: 'incomplete',
        donationAccountId: '',
        fundraiser: fundraiser
    });

    let [message, setMessage] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

    const handlePostChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(post);
        createPostService.addPost(post)
            .then(
                (resp) => {
                    console.log(resp.data);
                    setMessage("Post Added success!");
                    setErrorMessage("");
                    window.location.href = '/posts';
                }
            )
            .catch(
                (err) => {
                    console.log(err.response.data);
                    setMessage("");
                    setErrorMessage("Errors occurs in following fields:" + JSON.stringify(err.response.data));
                }
            )


    }

    return (
        
    <div style={{height: "97.5vh",overflow:"scroll"}}>
        
        <div className="formContainer">
<h2 className="form-title" style={{ textAlign: "center", wordSpacing: "10px" }}>Create Post </h2> <br/>
{
                message && <h3 className="alert alert-success">{message}</h3>
            }
            {
                errorMessage && <h3 className="alert alert-danger">{errorMessage}</h3>
            }

<form id="postForm" className="form-label" onSubmit={handleSubmit}>



<label  className="form-label">Title:</label>
<input type="text" id="title" name="title" className="form-control" pattern="[A-Za-z ]{3,}" value={post.title} onChange={handlePostChange} required/>
<br/><br/>

<label  className="form-label">Description:</label>
<textarea id="description" className="form-control" name="description" value={post.description} onChange={handlePostChange}  required></textarea>
<br/><br/>

<label  className="form-label">Category:</label>
<select id="category" name="category"  className="form-select" value={post.category} onChange={handlePostChange} required>
    <option value="food">Food</option>
    <option value="education">Education</option>
    <option value="medical">Medical</option>
</select>
    <br/><br/>

<label  className="form-label">Start Date:</label>
<input type="date" id="startDate" name="startDate"  className="form-control" value={post.startDate} onChange={handlePostChange} required />
    <br/><br/>

<label  className="form-label">End Date:</label>
<input type="date" id="endDate" name="endDate"  className="form-control" value={post.endDate} onChange={handlePostChange} required />
    <br/><br/>

<label  className="form-label">Target Amount:</label>
<input type="number" id="amountRequested" className="form-control" name="amountRequested"  pattern="^[1-9]\d*$" value={post.amountRequested} onChange={handlePostChange} required />
    <b/><br/>

    
<label className="form-label">Collected Amount:</label>
<input type="number" id="amountCollected" className="form-control" name="amountCollected"  pattern="^[0-9]\d*$"  value="0" onChange={handlePostChange} readOnly />
    <br/><br/>



<label  className="form-label">Donation ID:</label>
<input type="text" id="donationId" name="donationAccountId" className="form-control" value={post.donationAccountId} onChange={handlePostChange} required />
    <br/><br/>

<button type="submit" className="btn btn-success">Create</button>
</form>
</div>
</div>
    );
}

export default CreatePost;