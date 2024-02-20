import http from "http";
import SocketService from "./services/socket";


//function to initialise server
async function init(){

    const socketService = new SocketService();
    const httpServer = http.createServer();
    const Port = process.env.PORT ?process.env.PORT : 8000;

    socketService.io.attach(httpServer);

    httpServer.listen(Port, ()=>{
        console.log(`http server is running at ${Port}`);

    });
    socketService.initListeners();

}
init();

