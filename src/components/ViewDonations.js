import React, { useEffect, useState } from 'react';
import ViewDonationsService from '../services/ViewDonationsService';
import './ViewDonations.css';

const ViewDonations = () => {
  const [donations, setDonations] = useState([]);
  const [comments, setComments] = useState([]);
  const [error, setErrorMessage] = useState('');

  const postId = JSON.parse(sessionStorage.getItem('post')).id;

  useEffect(() => {
    if (postId) {
      ViewDonationsService.viewDonations(postId)
        .then(response => {
          console.log(postId);
          console.log(response);
          setDonations(response.data)
        })
        .catch(error => setErrorMessage('No donations to Show'));

      ViewDonationsService.viewComments(postId)
        .then(response => {
          console.log(postId);
          console.log(response);
          setComments(response.data)
        })
        .catch(error => setErrorMessage('No Comments to Show'));
    }
  }, [postId]);

  return (



  
  <div style={{height: "90vh",overflow:"scroll"}}>
    <h3>Donations:</h3>
    <div className="parent-box">
      <div className="details-box">
        <div className="post-grid-container">
          {donations.length > 0 || comments.length > 0 ? (
            donations.map((donation, index) => (
              <div className="post-grid" key={donation.id}>
                <div className="post-box">
                  <h4><strong> ₹ {donation.amount}</strong></h4>
                  <p>By :<strong>{donation.donors?.name}</strong></p>
                  <p>on :{donation.paymentDateTime}</p>
                </div>
                {comments[index] && (
                  <div className="post-box">
                    <p> Comment : <strong> {comments[index].commentDescription}</strong></p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No donations or comments in this Post</p>
          )}
        </div>
      </div>
    </div>
  </div>

    
  );
}

export default ViewDonations;