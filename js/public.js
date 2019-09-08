;(function(){
    //加载头部页面
    $("header").load("public.html .header",function(){
        //页面头部部分
        class Login{
            constructor(){
                //判断用户是否登录
                this.isLogin();
            }
            //查询本地cookie,来判断用户是否登录
            isLogin(){
                // console.log(getCookie("nameCookie"));
                // 有这个cookie说明以登录,没有泽未登录
                if(getCookie("nameCookie")){
                    var user_name = JSON.parse(getCookie("nameCookie"));
                    // console.log(user_name);
                    $(".header_top_right").find("li").children("span").html("欢迎"+ user_name.name+"先生登录")
                    .siblings().remove();
                }
            }
        }
        new Login();

        class Search{
            constructor(){
                this.index = -1;
                //绑定事件
                this.addEvent();
            }   
            addEvent(){
                //输入框
                $("#txt_t").on("focus",this.onFocus.bind(this));
                $("#txt_t").on("blur",this.onBlur.bind(this));
                $("#txt_t").on("input",this.onInput.bind(this));
                //搜索按钮
                $("#txt_s").on("click",this.onClick.bind(this));
                //给页面上不存在的li做事件委托
                $(".list").on("mouseenter","li",this.onMouseOver.bind(this));
                $("#txt_t").on("keydown",this.onKeyDown.bind(this));
                // console.log(1)
            }
            //输入框获取焦点事件
            onFocus(){
                // console.log(1);
                //边框变化
                $("#txt_t").css("border-color","#ff6700");
                $("#txt_s").css("border-color","#ff6700");
            }
            //输入框失去焦点
            onBlur(){
                $("#txt_t").css("border-color","#e0e0e0");
                $("#txt_s").css("border-color","#e0e0e0");
                $(".list").css("display","none");
            }
            //输入内容时
            onInput(){
                // console.log(1);
                var that = this;
                $.ajax({
                    url:"http://suggest.taobao.com/sug?&code=utf-8",
                    success:function(res){
                        // console.log(res);
                        that.res = res.result;
                        that.displayUl();
                    },
                    data:{
                        q:$("#txt_t").val()   //发送数据
                    },
                    dataType:"jsonp", //数据类型
                    jsonp:"callback"    //后调函数名
                })
    
            }
            //拿到数据渲染ul里面内容
            displayUl(){
                // console.log(this.res);
                var str = "";
                for(var i = 0;i < this.res.length;i++){
                    str += `<li>${this.res[i][0]}</li>`
                }
                // console.log(str);
                $(".list").css("display","block");
                $(".list").html(str);
            }
            //鼠标滑过,对应li的背景色改变
            onMouseOver(event){
                // console.log($(this).index());
                $(".list").children().css("background","#fff");
                this.target = $(event.target);
                // console.log(target);
                this.target.css("background","#f5f5f5")
                // console.log($(".list").children().index(this.target));
                // this.index = $(".list").children().index(this.target);
                $("#txt_t").val(this.target.html());
                // console.log(this);
            }
    
            onKeyDown(event){     
                if(event.which == 40){
                    this.index += 1;
                    if(this.index > $(".list").children().length - 1 ){
                        this.index = 0;
                    }
                    $(".list").children().css("background","#fff");
                    $(".list").children().eq(this.index).css("background","#f5f5f5");
                    $("#txt_t").val($(".list").children().eq(this.index).html());
                }
                if(event.which == 38){
                    this.index -= 1;
                    if(this.index < -1){
                        this.index = $(".list").children().length -1 ;
                    }
                    $(".list").children().css("background","#fff");
                    $(".list").children().eq(this.index).css("background","#f5f5f5");
                    // console.log(this.index);
                    $("#txt_t").val($(".list").children().eq(this.index).html());
                }
                // console.log($(".list").children().index(this.target));
                // console.log($(".list").children().length)
                // $(".list").children().eq(2).css("background","black")
            }
            //点击搜索
            onClick(){
                //把搜索内容绑定到url上面,后面再商品列表的时候获取到,渲染页面
                // console.log(1)
                this.searchValue = $("#txt_t").val();
                // $("#txt_t").val(this.searchValue);
                console.log(this.searchValue);
                location.href = "http://localhost/project_two/projectshop/list.html?searchValue=" + this.searchValue;
            }
            
        }
        new Search();

        class ThreeMenu{
            constructor(){
                //初始化,在页面加载的时候请求数据库进行页面渲染
                this.init();
            }
            init(){
                var that =this;
                $.ajax({
                    url:"http://localhost/project_two/projectshop/data/threemenu.php",
                    success:function(res){
                        that.menuRes = JSON.parse(res).msg;
                        //请求成功渲染页面
                        that.displayMenu();
                        // 绑定事件
                        that.addEvent();
                    }
                });
                
            }
            displayMenu(){
                //渲染主菜单
                // console.log(this.menuRes);
                var that =this;
                var str ="";
                for(var i = 0;i < this.menuRes.length;i++){
                    str += `<li>
                                <span>${this.menuRes[i].nav_name}</span>
                            </li>`;
                }
                // console.log(str);
                $(".header_nav_bottom_three").children("ul").children("li")
                .children("ul").html(str).children("li").css("border-bottom","1px solid red")
                .append("<ul>");

                $.ajax({
                    url:"http://localhost/project_two/projectshop/data/threelist.php",
                    success:function(res){
                        that.listRes = JSON.parse(res).msg;
                        //请求成功渲染页面
                        that.displayList();
                    }
                });
            }
            displayList(){
                //渲染菜单具体列表
                // console.log(this.listRes);
                // console.log(this.listRes[1].nav_type);
                // console.log(this.listRes[1].nav_type.length);
                // var a = this.listRes[1].nav_type.split(" ");
                for(var i = 0;i < 10;i++){
                    var str = "";
                    for(var j = 0; j < this.listRes[i].nav_type.split(" ").length;j++){
                        // console.log(this.listRes[i].nav_type.split(" ").length);
                        str += `<li>${this.listRes[i].nav_type.split(" ")[j]}</li>`;
                        // console.log(str);
                    }
                    $(".qqqq").children("li").eq(i).children("ul").html(str);
                }
            }
            addEvent(){
                // console.log(1)
                //绑定事件,确定每个菜单的移入移出
                $(".header_nav_bottom_three").children("ul").children("li")
                .hover(function(){
                    $(this).find("ul").stop().show()
                },function(){
                    $(this).find("ul").stop().hide()
                })

                $(".qqqq").find("span").on("mouseover",function(){
                    $(".qqqq").find("span").css("background-color","").siblings().stop().hide();
                    $(this).css("background-color","red").siblings().stop().show();
                })
            }


        }
        new ThreeMenu();

        //选项卡
        class ChooseCar{
            constructor(){
                //绑定事件
                this.addEvent();
            }
            //移入显示,移出消失
            addEvent(){
                $(".list_t").children("li").on("mouseover",function(){
                    console.log($(this).index());
                    $(".choose").css("display","none").eq($(this).index()).css("display","block");
                })
                $(".choose").on("mouseleave",function(){
                    $(".choose").css("display","none");
                })
                // $(".list_t").on("mouseout",function(){
                //     $(".choose").css("display","none");
                // })
                // $(".header_nav_bottom_list").on("mouseout",function(){
                //     $(".choose").css("display","none");
                // })
            }
        }
        new ChooseCar();
    });
     //页脚样式加载
     $("footer").load("public.html .margin_f",function(){
        // console.log(1);
    });
})();