import { useEffect,useState } from "react";
import './Donate.css'
import donateService from "../services/DonateService";
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

  


function Donate() {

    //const donateService = new DonateService();
    const navigate = new useNavigate();

    const[errorMessage,setErrorMessage] = useState("");

    const [user, setUser] = useState({
        id: '', 
        name: '',
        email: '',
        password:'',
        accountId:'',
        accountBalance:''
      });
    
      const [post, setPost] = useState({
        id: '', 
        title: '',
        description: '',
        category:'',
        startDate:'',
        endDate:'',
        amountRequested:'',
        amountCollected:'',
        status:'',
        donationAccountId:'',
        fundraiser:''
    
      });

      const [transaction,setTransaction] = useState ({
        senderId: '',
        receiverId: '',
        amount:''
      })

      const [commentt,setCommentt] = useState ({
        donorId:'',
        postId:'',
        commentDescription:''
      })
      useEffect(() => {

  //       const sessionData = {
  //         id : 2,
  //         name: 'DonorOne',
  //         email: 'd1@g.com',
  //         role: 'donor',
  //         password: 'd1d1d1',
  //         accountId:'donor1@upi',
  //         accountBalance:38000.0
  //     };
  //     const dataString = JSON.stringify(sessionData);

  // // Add data to sessionStorage
  // sessionStorage.setItem('user', dataString);

        const userData = JSON.parse(sessionStorage.getItem('user'));
      
        if (userData) {
          setUser({
            ...userData,
            id: userData.id, 
            name: userData.name,
            password:userData.password,
            accountId:userData.accountId,
            accountBalance:userData.accountBalance
          });
        }
      
        const postData = JSON.parse(sessionStorage.getItem('post'));
        
      if (postData) {
          setPost({
              ...postData,
              id: postData.id, 
              title: postData.title,
              description: postData.description,
              category:postData.category,
              startDate:postData.startDate,
              endDate:postData.endDate,
              amountRequested:postData.amountRequested,
              amountCollected:postData.amountCollected,
              status:postData.status,
              donationAccountId:postData.donationAccountId,
              fundraiser:postData.fundraiser
      
          })
      }
      
      }, []);

      useEffect(() => {
        console.log(user.accountId + " " + user.accountBalance)
        if (user.accountId && post.donationAccountId) {
          setTransaction({
            senderId: user.accountId,
            receiverId: post.donationAccountId
          });
        }
      }, [user, post]); // This useEffect depends on user and post states
      
      // Similar for comment
      useEffect(() => {
        if (user.id && post.id) {
          setCommentt({
            donorId: user.id,
            postId: post.id
          });
        }
      }, [user, post]); // This useEffect also depends on user and post states
  

      const handleChangeDonation = (e) => {
         const {name , value } = e.target;
         setTransaction(transaction => ({
            ...transaction,
            [name]:value
         }));
      }

      const handleChangeCommentt = (e) => {
        const {name , value } = e.target;
        setCommentt(commentt => ({
           ...commentt,
           [name]:value
        }));
     }

     const donateTransaction =  () => {

        const userData = JSON.parse(sessionStorage.getItem('user'));

        console.log("User : ",user);
        console.log("userSession : ",userData);
        console.log("Transaction : ",transaction)
        console.log("COmment", commentt);

        donateService.donateTransact(transaction)
        .then(
            (resp)=>{
               console.log(resp);
               alert("donation Sucessfull");
               navigate('/posts');
               donateService.addCommentt(commentt)
               .then(
                (resp)=> {
                    console.log(resp);
                
                }
               )
               .catch(
                (err)=>{
                    console.log(err);
             
                 }
               )
            }
            )
    
        .catch(
            (err)=>{
                console.log(err);
                console.log('hi');
                console.log(err.response.data);
                setErrorMessage(err.response.data);
         
             }
        )
     }

    return (
        <>
        <div className="container my-container">
    <h2 className="text-center"><strong>Transaction</strong></h2>
    <p className="text-center"><strong>Title:</strong> {post.title}</p>
    <p className="text-center"><strong>Category:</strong> { post.category}</p>
  
      <div className="form-group">
        <label ><strong>Donation Amount:</strong></label>
        <input type="number" className="form-control" id="donateAmount" name="amount"  onChange={handleChangeDonation} required />
        
      </div>
  
      <div className="form-group">
        <label ><strong>Comment:</strong></label>
        <input type="text" className="form-control" id="addComment" name="commentDescription" onChange={handleChangeCommentt} required />
      </div>
      <br/>
    
      <button className="btn btn-primary" onClick={donateTransaction} >Donate</button>
      <p  className="text-danger">{errorMessage}</p>
      </div>

      
    
  

        </>

    )

}

export default Donate;