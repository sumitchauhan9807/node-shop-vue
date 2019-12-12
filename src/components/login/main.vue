<template>
<div>
    <div class="login-form">
    <form action="/examples/actions/confirmation.php" method="post">
        <h2 class="text-center">Sign in/Register</h2>   
        <div class="form-group">
            <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                <input type="text" class="form-control" placeholder="First Name" v-model="loginData.firstname">				
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                <input type="text" class="form-control" placeholder="Last Name" v-model="loginData.lastname">				
            </div>
        </div>
        <div class="form-group">
            
        	<div class="input-group">
                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                <input type="text" class="form-control" placeholder="Email" v-model="loginData.email">				
            </div>
        </div>
		<div class="form-group">
            <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input type="password" class="form-control"  placeholder="Password" v-model="loginData.password">				
            </div>
        </div>        
        <div class="form-group">
            <button type="button" @click="submitLoginData($event)" class="btn btn-primary login-btn btn-block">Sign in</button>
            <button type="button" @click="registerUser($event)" class="btn btn-warning login-btn btn-block">Register</button>
        </div>
        <div class="clearfix">
            <label class="pull-left checkbox-inline"><input type="checkbox"> Remember me</label>
            <a href="#" class="pull-right">Forgot Password?</a>
        </div>
		<div class="or-seperator"><i>or</i></div>
        <p class="text-center">Login with your social media account</p>
        <div class="text-center social-btn">
            <a href="https://sumit-node-shop.herokuapp.com/users/auth/facebook" class="btn btn-primary"><i class="fa fa-facebook"></i>&nbsp; Facebook</a>
            <a href="#" class="btn btn-info"><i class="fa fa-twitter"></i>&nbsp; Twitter</a>
			<a href="#" class="btn btn-danger"><i class="fa fa-google"></i>&nbsp; Google</a>
        </div>
    </form>
    <p class="text-center text-muted small">Don't have an account? <a href="#">Sign up here!</a></p>
</div>
</div>
</template>

<script>
import { eventBus } from '../../main'; 
import { isAdmin } from '../../main';
export default {
    data(){
        return {
            loginData:{
                email:null,
                password:null,
                firstname:null,
                lastname:null
            }
        }
    },
    methods:{
        submitLoginData(e){
            e.preventDefault();
            let data = {
                email:this.loginData.email,
                password:this.loginData.password
            }
            this.$http.post('https://sumit-node-shop.herokuapp.com/users/login',data).then((response)=>{
                if(response.status == 200){
                    alert('login successfull');
                }
                return response.json();
            }).then((result)=>{
                console.log(result);
                localStorage.setItem('token',result.token);
                eventBus.$emit('userLoggedIn');
            }).catch((err)=>{
                alert('wrong credentials');
            })
        },
        registerUser(e){
            e.preventDefault();
            //http://localhost:3000
            //https://sumit-node-shop.herokuapp.com
            this.$http.post('https://sumit-node-shop.herokuapp.com/users/signup',this.loginData).then((response)=>{
                return response.json();
                
            }).then((result)=>{
              //  console.log(result);
              alert('regsitered successfully')
            }).catch(()=>{
                alert('erorr registering { mail already exists}');
            })

        }
    },created(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var token = url.searchParams.get("token");
        var id = url.searchParams.get("userId");
        if(token){
            this.$http.get('https://sumit-node-shop.herokuapp.com/users/'+id+'').then((response)=>{
                return response.json();
            }).then((result)=>{
                localStorage.setItem('token',token);
                localStorage.setItem('username',result.email);
                eventBus.$emit('userLoggedIn',result);
                window.location='./login';
            });   
        }
    }

}

</script>

<style scoped>
.login-form {
		width: 385px;
		margin: 30px auto;
	}
    .login-form form {        
    	margin-bottom: 15px;
        background: #f7f7f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }
    .login-form h2 {
        margin: 0 0 15px;
    }
    .form-control, .login-btn {
        min-height: 38px;
        border-radius: 2px;
    }
    .input-group-addon .fa {
        font-size: 18px;
    }
    .login-btn {
        font-size: 15px;
        font-weight: bold;
    }
	.social-btn .btn {
		border: none;
        margin: 10px 3px 0;
        opacity: 1;
	}
    .social-btn .btn:hover {
        opacity: 0.9;
    }
	.social-btn .btn-primary {
        background: #507cc0;
    }
	.social-btn .btn-info {
		background: #64ccf1;
	}
	.social-btn .btn-danger {
		background: #df4930;
	}
    .or-seperator {
        margin-top: 20px;
        text-align: center;
        border-top: 1px solid #ccc;
    }
    .or-seperator i {
        padding: 0 10px;
        background: #f7f7f7;
        position: relative;
        top: -11px;
        z-index: 1;
    }   

</style>