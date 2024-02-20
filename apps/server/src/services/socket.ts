
import {Server} from 'socket.io'
import Redis from 'ioredis'

const pub = new Redis();
const sub = new Redis();

class SocketService{

    private _io: Server;
    constructor() {
        console.log("init socket server ...");
        this._io = new Server(
            {
                cors:{
                    allowedHeaders:["*"],
                    origin: '*',
                },
            }
        );

        sub.subscribe("MESSAGES");
       




    }
    get io() {
        return this._io;
    }

    public initListeners(){
        const io = this.io;
        console.log("init socket listeners")
        io.on("connect", (socket)=>{
            console.log(`socket connected`, socket.id);
            socket.on("event:message", async({message}:{message:string})=>{
                console.log(`new message recieved`,message)
                //publish this message to ioredis
                await pub.publish("MESSAGES", JSON.stringify({message}));
            });
             
        })
        sub.on("message", (channel, message)=>{

            if(channel==="MESSAGES"){
                console.log("new message recieved from redis", message);
            io.emit("event:message", JSON.parse(message));

            }
            
        })
    }
}

export default SocketService;