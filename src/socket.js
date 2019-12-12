const jwtDecode = require('jwt-decode');
import io from 'socket.io-client';
import { eventBus } from './main';
// var name='sumit';
// export const socket = ()=>{
//     io('https://sumit-node-shop.herokuapp.com',{query:'token='+name+''});
// }
//http://localhost:3000

//     var token = localStorage.getItem('token');

export class Sockets{

    constructor(){
        this.socket=null;
        this.events();
        this.connectUser();
    }
    connect(token){
        //https://sumit-node-shop.herokuapp.com
        let socket = io('https://sumit-node-shop.herokuapp.com',{query:'token='+token+''});
        this.socket=socket;
        this.registerSocketEvents(socket);
    }
    registerSocketEvents(socket){
        // all-clients is emitted by wss on a new connection 
        socket.on('all-clients',function(data){
            eventBus.$emit('all-clients',data);
            //console.log('all-online-clients',data)
        });
        // client-online is emitted when a new connection is registered in wss
        socket.on('client-online',function(data){
            eventBus.$emit('client-online',data);
           // console.log('new-client-online',data)
        });
        // client-offline is emitted on a connection termination
        socket.on('client-offline',function(data){
            eventBus.$emit('client-offline',data);
            //console.log('a-client-got-offline',data)
        });
        // chat-message is emitted when this clients receives a message
        socket.on('chat-message',function(data){
            eventBus.$emit('new-message',data);
            console.log('you-got-a-new-message',data)
        });

        eventBus.$on('send-message',function(data){
            socket.emit('sendMessageToID',data);
        })
    }
    events(){
        eventBus.$on('userLoggedIn',()=>{
            this.connectUser();
        })
    }
    connectUser(){
        if(this.socket){
            this.socket.close();
        }
        var token = this.getUserToken();
        if(token){
            this.connect(token);
        }else{
            console.log('no user found');
        }
    }
    getUserToken(){
        var token = localStorage.getItem('token');
        try{
            var decoded = jwtDecode(token);
            return token;
        }catch(err){
            return false;
        }
    }
}

