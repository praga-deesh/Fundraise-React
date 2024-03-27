import FundraiserProfile from "./FundRaiserProfile";
import DonorProfile from './DonorProfile'; 
import { useNavigate } from "react-router-dom";



function Profile() {

    const navigate = useNavigate();

    const redirectToDonorLogin = () => {
    navigate('/donor-login');
}

    const userString = sessionStorage.getItem('user');
    

    if(userString)
    {
        const user = JSON.parse(userString);
        if(user.role === 'donor')
        {
            return <DonorProfile />
        }
        else if(user.role === 'fundraiser')
        {
            return <FundraiserProfile />
        }
    }
    else 
    {
        return (
            <>
            <h3>No Profile to Show
            </h3>
            <h6>Login here <button onClick={redirectToDonorLogin} > Login </button></h6>
            </>
        )
    }


}






export default Profile;