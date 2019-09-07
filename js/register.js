;(function(){
    //注册页面
    class Regisiter{
        constructor(){
            //用户名
            this.user_name = document.getElementById("user_name");
            //用户名要求
            this.name_requset = document.querySelector(".name_requset");
            // 用户名错误
            this.name_error = document.querySelector(".name_error");
            //用户名正确
            this.name_success = document.querySelector(".name_success");
            //手机号
            this.user_phone = document.getElementById("user_phone");
            //手机号要求
            this.phone_requset = document.querySelector(".phone_requset");
            // 手机号错误
            this.phone_error = document.querySelector(".phone_error");
            //手机号正确
            this.phone_success = document.querySelector(".phone_success");
            //密码
            this.user_pwd = document.getElementById("user_pwd");
            //密码要求
            this.pwd_requset = document.querySelector(".pwd_requset");
            // 密码错误
            this.pwd_error = document.querySelector(".pwd_error");
            //密码正确
            this.pwd_success = document.querySelector(".pwd_success");
            
            //复选框按钮
            this.user_check = document.getElementById("user_check");
            this.check_span = document.querySelector(".check_span");
            //注册按钮
            this.submitBtn = document.getElementById("submit");
            
            //执行绑定事件
            this.addEvent();
        }
        //绑定事件
        addEvent(){
            var that = this;
            //用户名要求在获取焦点时出现,失去焦点隐藏
            this.user_name.addEventListener("focus",function(){
                that.name_requset.style.display = "block";
                that.name_success.style.display = "none";
                that.name_error.style.display = "none";
            })
            this.user_name.addEventListener("blur",function(){
                that.name_requset.style.display = "none";
                //同时判断用户名是否正确
                //如果输入框内有内容就判断.没有就算不显示
                if(that.user_name.value){
                    that.checkName();
                } 
            })
            //手机号
            this.user_phone.addEventListener("focus",function(){
                that.phone_requset.style.display = "block";
                that.phone_success.style.display = "none";
                that.phone_error.style.display = "none";
            })
            this.user_phone.addEventListener("blur",function(){
                that.phone_requset.style.display = "none";
                //同时判断手机号是否正确
                //如果输入框内有内容就判断.没有就算不显示
                if(that.user_phone.value){
                    that.checkPhone();
                } 
            })
            //密码
             this.user_pwd.addEventListener("focus",function(){
                that.pwd_requset.style.display = "block";
                that.pwd_success.style.display = "none";
                that.pwd_error.style.display = "none";
            })
            this.user_pwd.addEventListener("blur",function(){
                that.pwd_requset.style.display = "none";
                //同时判断密码是否正确
                //如果输入框内有内容就判断.没有就算不显示
                if(that.user_pwd.value){
                    that.checkPwd();
                } 
            })
            //注册按钮
            this.submitBtn.addEventListener("click",function(){
                // open("http://www.baidu.com");
                var registerStatus = that.name_status + that.phone_status + that.pwd_status;
                // console.log(that.name_status);
                if(that.user_check.checked && registerStatus == 3){
                    // open("http://baidu.com");
                    //把用户注册信息发送到数据库
                    console.log(that.user_name.value);
                    ajax({
                        type:"post",
                        url: "http://localhost/project_two/projectshop/data/register.php",
                        success:function(res){
                            console.log(res);
                            // 数据存储成功之后,根据后端会数据进行
                            that.openLoad();
                        },
                        error:function(res){
                            console.log(res);
                        },
                        data:{
                            userName:that.user_name.value,
                            userPhone:that.user_phone.value,
                            userPwd:that.user_pwd.value
                        }
                    });                    
                }else{
                    //判断哪些内容是错误的
                    if(that.user_check.checked == false){
                        that.check_span.style.display = "block";
                    }else{
                        that.check_span.style.display = "none";
                    }
                    if(!that.name_status){
                        that.name_error.style.display = "block";
                    }
                    if(!that.phone_status){
                        that.phone_error.style.display = "block";
                    }
                    if(!that.pwd_status){
                        that.pwd_error.style.display = "block";
                    }
                } 
            })
            //复选框
            this.user_check.addEventListener("click",function(){
                if(that.user_check.checked == true){
                    that.check_span.style.display = "none";
                    // console.log(1);
                }
            })
        }
        //用户注册成功且数据存储成功.跳转登录页面
        openLoad(){
            open("http://localhost/project_two/projectshop/login.html");
        }
        //判断用户名是否正确
        checkName(){
            var uName = this.user_name.value;
            // console.log(uName);
            var reg = /^[\u4E00-\u9FA5\w-]{4,20}$/;
            if(reg.test(uName)){
                this.name_success.style.display = "block";
                this.name_status = 1;
            }else{
                this.name_error.style.display = "block";
                this.name_status = 0;
            }
        }
        //判断手机号是否正确
        checkPhone(){
            var uPhone = this.user_phone.value;
            var reg = /^1\d{10}$/;
            // console.log(111)
            // console.log(reg.test(uPhone));
            if(reg.test(uPhone)){
                this.phone_success.style.display = "block";
                this.phone_status = 1;
                
            }else{
                this.phone_error.style.display = "block";
                this.phone_status = 0;
                // console.log(1);
            }
        }
        //判断密码是否符合要求
        checkPwd(){
            var uPwd = this.user_pwd.value;
            var reg = /^1\d{10}$/;
            if(reg.test(uPwd)){
                this.pwd_success.style.display = "block";
                this.pwd_status = 1;
            }else{
                this.pwd_error.style.display = "block";
                this.pwd_status = 0;
            }
        }
    }
    new Regisiter();
})();