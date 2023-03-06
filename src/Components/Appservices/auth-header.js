export default function AuthHeader() {
    const currentUser = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : "";
     
    // console.log(currentUser)
    if (currentUser && currentUser.access_token) {
  
      return {
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${currentUser.access_token}`,
      };
    } else {
      return {};
    }
}