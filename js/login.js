;(function(){
    class Login{
        constructor(){
            //绑定事件
            this.addEvent();
            //初始化页面,主要看是否记住密码,以及复选框状态
            this.init();
        }
        //对页面进行初始化
        init(){
            // console.log(document.cookie);
            //先进行查询cookie,有cookie就设置,没有就不设置
            if(document.cookie){
                // console.log(cookieInfo); 
                var cookieInfo = JSON.parse(getCookie("userinfo"));
                $("#user_phone")[0].value = cookieInfo.uPhone;
                $("#user_pwd")[0].value = cookieInfo.uPwd;
                $("#user_check")[0].checked = true;
            }
        }
        //绑定事件
        addEvent(){
            //点击提交按钮?????????
            $("#submit").on("click",this.submit.bind(this));
            //点击记住密码实现七天免登录
            $("#user_check").on("click",this.remberUser.bind(this));
        }
        //点击登录
        submit(){           
             //输入框内的值
            this.userPhone = $("#user_phone").val();
            this.userPwd = $("#user_pwd").val();
            var that = this;
            //登录中
            $("#submit").val("登录中");
            $("#submit").addClass("login");
            $.ajax({
                url:"http://localhost/project_two/projectshop/data/login.php",
                data:{
                    userPhone:this.userPhone,
                    userPwd:this.userPwd
                },
                success:function(res){
                    // console.log(res);
                    console.log(JSON.parse(res));
                    that.res = JSON.parse(res);
                    that.nameInfo = that.res.user_name.user_name;
                    if(that.res.code == 1){
                        //当用户输入正确的,跳转页面,同时把用户名存起来
                        // console.log(1)
                        that.userName();
                        that.loginSuccess();
                    }else{
                        //用户账号密码输入错误
                        that.loginError();
                    }
                }
                // timeout:3000,
                // error:function(res){
                //     //请求超时
                //     // console.log(res)
                    
                // }
                
            })
        }
        //用户账号密码输入正确
        loginSuccess(){
            $("#submit").val("登录");
            $("#submit").removeClass("login");
            open("http://localhost/project_two/projectshop/index.html");
        }
        //用户登录成功,把用户名存到cookie中
        userName(){
            // console.log(this.nameInfo);
            this.nameCookie = {
                name:this.nameInfo
            }
            setCookie("nameCookie",JSON.stringify(this.nameCookie),{
                expires:7
            });
        }
        //用户账号密码输入错误
        loginError(){
            $("#submit").val("登录");
            $("#submit").removeClass("login");
            $("#error").css("display","block");
            $("#user_pwd").css("border-color","red");
        }
        //用户记住密码七天免登录
        remberUser(){
            // console.log();
            var choose = $("#user_check")[0].checked;
            //判断用户是否点击记住密码
            this.userinfo = {
                uPhone: $("#user_phone").val(),
                uPwd: $("#user_pwd").val() 
            }
            if(choose == true){
                setCookie("userinfo",JSON.stringify(this.userinfo),{
                    expires:7
                })
            }else{
                //用户取消记住密码,需要删除之前cookie
                removeCookie("userinfo");
            }
        }

    }
    new Login();
})();