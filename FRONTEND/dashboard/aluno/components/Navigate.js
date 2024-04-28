import controller from "./controler.js";
function navigateRoot(path) {
    window.location.hash = path; 
    controller(); 
}
export default navigateRoot;
