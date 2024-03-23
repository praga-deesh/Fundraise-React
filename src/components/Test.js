import { useState } from "react";
import testService from "../services/TestService";

function Test()  {

    //let posts;

    let [posts,setPosts] = useState([])

    const loadAllData = () => {
        testService.getAllPosts()
        .then(
            (resp) => {
                console.log(resp.data);
                setPosts(resp.data);
            }
        )
        .catch(
            (err) => {
                console.log(err);
            }
        )
        .finally(
            () => {
                console.log("Loaded All Data from the server !!! ");
            }
        )

    }

    loadAllData();
 
    return (
        <div>
            <h2>Test Page</h2>
            <h6>Display All Posts</h6>
            <br></br>
            {JSON.stringify(posts)}
            <br></br>
        </div>
    );
}

export default Test;