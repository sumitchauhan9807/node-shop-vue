<template>
<div>
	<div class="chatModule">
		<div class="chatBoxesContainer" ref="refchatBoxesContainer">
			<!-- <chat-box class="chatBox"></chat-box> 
			 <chat-box class="chatBox"></chat-box>
			<chat-box class="chatBox"></chat-box>  -->
		</div>
		<div class=" sidebar onlineFriends">
		<div class="mini-submenu">
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</div>
		<div class="list-group">
			<span href="#" class="list-group-item active">
				Online Users
				<span class="pull-right" id="slide-submenu">
					<i class="fa fa-times"></i>
				</span>
			</span>
			<a href="#" class="list-group-item" v-for="client in allClients" @click="makeBox(client.id)">
				<img :src="client.image"> <span>{{ client.name }} </span>
			</a>
		</div>        
		</div>
		
	</div>
</div>
</template>
<script>
import $ from 'jquery';
import Vue from 'vue';
import { eventBus } from '../../main';
import ChatBox from './chatBox.vue';
export default {
	components:{
		chatBox:ChatBox
	},
	data(){
		return {
			allClients:[],
			openedChats:0,
			baseUrl:'https://sumit-node-shop.herokuapp.com/'
		}
	},
	methods:{
		makeBox(clientId){
			if(this.openedChats > 2){
				alert('close some of the chats');
				return ;
			}
			if(this.checkClientAlreadyOpened(clientId)){
				alert('user chat is already opened !!');
				return;
			}

			this.openedChats++;
			var NewChatBox = Vue.extend(ChatBox)
			var chatBox = new NewChatBox({
				propsData: { data:this.allClients.find((client)=>{
						return client.id == clientId;
					}) 
				}
			});
			
			chatBox.$mount() // pass nothing
			
			this.setBoxDestroyHandler(chatBox);
			this.setClientOpenedProp(clientId);
			
			this.$refs.refchatBoxesContainer.appendChild(chatBox.$el);
		},
		setClientOpenedProp(clientId){
			this.allClients = this.allClients.map((client)=>{
				if(client.id == clientId){
					client.opened = true;
					return client;
				}
				return client;
			})
		},
		checkClientAlreadyOpened(clientId){
			let clientOpned = this.allClients.find((client)=>{
				return client.id == clientId
			}) 
			return clientOpned.opened;
		},
		setBoxDestroyHandler(chatBox){
			var obj = $(chatBox.$el).find('.destroyChatBox');
			var thisClientId = $(chatBox.$el).attr('data-id');
			//console.log(thisClientId);
			obj.click(()=>{
				chatBox.$destroy();
				this.allClients = this.allClients.map((client)=>{
					if(thisClientId == client.id){
						client.opened = false;
						return client;
					}
					return client;
				})	
				this.openedChats--;
			})
		},
	},
	created(){
		eventBus.$on('all-clients',(data)=>{
			this.allClients = data.map((client)=>{
				return {...client,opened:false,messages:[]}
			});
			console.log('all clients data received',this.allClients);
		})
		eventBus.$on('client-online',(data)=>{
			console.log('online',data);
			this.allClients.push({...data,opened:false,messages:[]})
			console.log(this.allClients);
		})
		eventBus.$on('client-offline',(id)=>{
			console.log('offline',id);
			this.allClients = this.allClients.filter((client)=>{
				return client.id != id;
			})
			let chatBox = $('.chatBoxesContainer').find("[data-id='" + id + "']");
			if(chatBox){
				chatBox.remove();
				this.openedChats--;
			}
		})
		eventBus.$on('new-message',(data)=>{
			alert('a new message received');
			let id = data.id;
			let message = data.message;
			this.allClients = this.allClients.map((client)=>{
				if(client.id == id){
					client.messages.push({
						id:id,
						message:message
					})
					return client;
				}
				return client;
			})
			console.log(this.allClients);
		})
	}
}






$(function(){
	$('#slide-submenu').on('click',function() {			        
        $(this).closest('.list-group').fadeOut('slide',function(){
        	$('.mini-submenu').fadeIn();	
        });
        
      });

	$('.mini-submenu').on('click',function(){		
        $(this).next('.list-group').toggle('slide');
        $('.mini-submenu').hide();
	})
})
</script>


<style scoped>
.list-group-item img{
	height:34px;
}
.list-group-item span{
	padding-left:18px;
}
.chatBoxesContainer{
	display:inline-block;
	vertical-align:top;
}
.chatModule{
	position:fixed;
	right:0px;
	bottom:0px;
    z-index:99999;
	width:100%;
	
	text-align: right;
}
.onlineFriends{
	width:25%;
	display:inline-block;
	vertical-align: bottom;
	text-align: left;
}
.onlineFriends a{
	color:black;
}
.mini-submenu{
  display:none;  
  background-color: rgba(0, 0, 0, 0);  
  border: 1px solid rgba(0, 0, 0, 0.9);
  border-radius: 4px;
  padding: 9px;  
  /*position: relative;*/
  width: 42px;

}

.mini-submenu:hover{
  cursor: pointer;
}

.mini-submenu .icon-bar {
  border-radius: 1px;
  display: block;
  height: 2px;
  width: 22px;
  margin-top: 3px;
}

.mini-submenu .icon-bar {
  background-color: #000;
}

#slide-submenu{
  background: rgba(0, 0, 0, 0.45);
  display: inline-block;
  padding: 0 8px;
  border-radius: 4px;
  cursor: pointer;
}
.list-group-item.active {
    
    background-color:#71cd14 !important;
    border-color:#71cd14 !important;
}
</style>
