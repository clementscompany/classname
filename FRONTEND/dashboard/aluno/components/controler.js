import boletin from "./boletin.js";
import chatArea from "./chat.js";
import HomePage from "./home.js";
function controller() {
    let path = window.location.hash.substring(1); 
    switch (path) {
        case "/boletin":
            boletin();
            break;

        case "/chat":
            chatArea();
        default:
            HomePage();
            break;
    }
}
export default controller;