<template>
<div class="chatBox" :data-id="data.id">
    <span href="#" class="list-group-item active">
			  {{data.name}}
				<span class="pull-right">
					<a class="destroyChatBox" href="#" style="color:white"><i class="fa fa-times"></i></a>
				</span>
			</span>
<div class="screen">
    
	<div class="conversation">
        <div v-for="message in data.messages">
            <div class="messages messages--received" v-if="message.id">
                <div class="message">{{message.message}}</div>
            </div>
            <div class="messages messages--sent" v-else>
                <div class="message">{{message.message}}</div>
            </div>
		</div>
	</div>
	<div class="text-bar">
		<form class="text-bar__field" id="form-message">
			<input id="userMessage" type="text" v-bind:placeholder="message" v-model="message">
		</form>
		<div class="text-bar__thumb">
			<a href="#" @click="sendMessage(data.id)" class="thumb">send</a>
		</div>
	</div>
</div>
</div>
</template>

<script>
import $ from 'jquery';
import { eventBus } from '../../main';
export default {
    data(){
        return {
            message:''
        }
    },
    props:['data'],
    methods:{
        sendMessage(id){
            eventBus.$emit('send-message',{
                id:this.data.id,
                message:this.message
            });
            this.data.messages.push({
                id:null,
                message:this.message
            })
            this.message='';
        }
        
    },
    created(){
        console.log(this.data)
    },
    beforeDestroy () {
        this.$root.$el.parentNode.removeChild(this.$root.$el)
    },

}
//  let data = {
//              id:toSendId,
//              message:message
//          }
//         socket.emit('sendMessageToID',data);


</script>

<style scoped>
* {
  box-sizing: border-box;
}
.chatBox{
	float:left;
	margin-right:10px;
	text-align: left;
}
.clearfix:after, .messages:after {
  content: "";
  display: table;
  clear: both;
  height: 0;
  visibility: hidden;
}

body {
  background-color: #ddd;
  padding: 40px;
}

.screen {
  background-color: #fff;
  height: 400px;
  width: 300px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

.conversation {
  height: calc(100% - 50px);
  overflow: auto;
  padding: 20px;
  padding-bottom: 0;
}

.messages {
  margin-bottom: 10px;
}
.messages--received .message {
  float: left;
  background-color: #ddd;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}
.messages--received .message:first-child {
  border-top-left-radius: 15px;
}
.messages--received .message:last-child {
  border-bottom-left-radius: 15px;
}
.messages--sent .message {
  float: right;
  background-color: #1998e6;
  color: #fff;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}
.messages--sent .message:first-child {
  border-top-right-radius: 15px;
}
.messages--sent .message:last-child {
  border-bottom-right-radius: 15px;
}

.message {
  display: inline-block;
  margin-bottom: 2px;
  clear: both;
  padding: 7px 13px;
  font-size: 12px;
  border-radius: 15px;
  line-height: 1.4;
}
.text-bar {
  height: 50px;
  border-top: 1px solid #ccc;
}
.text-bar__field {
  float: left;
  width: calc(100% - 50px);
  height: 100%;
}
.text-bar__field input {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  border: none;
  position: relative;
  vertical-align: middle;
  font-size: 14px;
}
.text-bar__thumb {
  float: left;
  width: 50px;
  height: 100%;
  padding: 10px;
}
.text-bar__thumb:hover {
  opacity: .8;
}
.text-bar__thumb .thumb {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.thumb {
  display: block;
}





</style>