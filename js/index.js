;(function(){
    //轮播图广告
    $("#banner").load("public.html .margin_b",function(){
        //轮播图效果
        class Banner{
            constructor(){
                this.zIndex = 1;   //层级
                this.index = 0;     //下标

                //自动轮播
                this.displayAuto();
                //绑定事件
                this.addEvent();
            }
            addEvent(){
                var that = this;
                //鼠标滑过左右箭头
                $(".left").bind({
                    mouseover:function(){   
                        $(this).css({
                            background:"rgba(0, 0, 0, .6)",
                            color: "#fff"
                        })
                    },
                    mouseleave:function(){
                        $(this).css({
                            background:"",
                            color: "#ccc"
                        })
                        // console.log(1);
                    },
                    click:function(event){     
                        event.preventDefault()             
                        that.leftDisplay();
                    }
                });
                $(".right").bind({
                    mouseover:function(){
                        $(this).css({
                            background:"rgba(0, 0, 0, .6)",
                            color: "#fff"
                        })
                    },
                    mouseleave:function(){
                        $(this).css({
                            background:"",
                            color: "#ccc"
                        })
                    },
                    click:function(){
                        that.rightDisplay();
                    }
                });
                //鼠标滑过以及点击底下小导航
                $(".point").children().bind({
                    mouseover:function(){
                        $(this).css({"background":"#333","color":"#fff"}).siblings().css({"background":"#fff","color":"#333"})
                    // },
                    // click:function(){
                        // console.log($(this).index());
                        // 这里让底下小导航和图片使用一个下标
                        that.index = $(this).index()
                        $(".imgbox").children("a").eq(that.index).css({
                        zIndex:that.zIndex++,
                        opacity:0
                        }).animate({
                            opacity:1 
                        },1000)  
                    }
                })
                //给轮播大框绑定事件,进入停止轮播,出去继续
                $(".imgbox").hover(function(){
                    clearInterval(that.times);
                },function(){
                   that.displayAuto();  
                })
            }
            //向左滑动
            leftDisplay(){
                // console.log("left");
                console.log(this.index);
                if(this.index  == -1){
                    this.index = 4;
                }else{
                    this.index--;
                }
                // console.log(this.index);
                // console.log(this.zIndex++);
                $(".banner").children("a").eq(this.index).css({
                    zIndex:this.zIndex++,
                    opacity:0
                }).animate({
                    opacity:1 
                },1000) 
                 //底下小导航
                 $(".imgindex").find(".point").children().css({"background":"#fff","color":"#333"});
                 $(".imgindex").find(".point").children().eq(this.index).css({"background":"#333","color":"#fff"});
            }
        // 向右滑动
            rightDisplay(){
                // console.log($(".banner").children("a").length)
                if(this.index  == $(".imgbox").children("a").length -1){
                    this.index = 0;
                }else{
                    this.index++;
                }
                // console.log(this.index);
                // console.log(this.zIndex++);
                //图片轮播
                $(".imgbox").children("a").eq(this.index).css({
                    zIndex:this.zIndex++,
                    opacity:0
                }).animate({
                    opacity:1 
                },1000)    
                //底下小导航
                $(".imgindex").find(".point").children().css({"background":"#fff","color":"#333"});
                $(".imgindex").find(".point").children().eq(this.index).css({"background":"#333","color":"#fff"})
                
            }
            // 自动轮播
            displayAuto(){
                var that = this;
                clearInterval(this.times);
                this.times = setInterval(function(){
                    that.rightDisplay();
                },3000)
            }
        }
        new Banner();
    });

    //主页秒杀商品列表
    class GoodsTime{
        constructor(){
            //进行初始化,进行数据请求,渲染页面
            this.init();
        }
        init(){
            var that = this;
            $.ajax({
                url:"http://localhost/project_two/projectshop/data/goodstime.php",
                success:function(res){
                    that.res = JSON.parse(res).msg;
                    // console.log(that.res);
                    //数据请求成功
                    that.display();
                },
                data:{
                    goodsType:"秒杀"
                }
            })
        }
        //渲染页面
        display(){
            var str = "";
            for(var i = 0;i < this.res.length;i++){
                str += `<li class="${this.res[i].Id}">
                            <a href="http://localhost/project_two/projectshop/goodsmsg.html?goodsId=${this.res[i].Id}">
                                <div>
                                    <img src="goodsimg/${this.res[i].goods_img}" alt="">
                                    <p>${this.res[i].goods_name}</p>
                                    <i></i>
                                    <span>￥${this.res[i].goods_price}元</span>
                                </div>
                            </a>
                        </li>`;
            }
            // console.log(str);
            $(".super_time").find("ul").append(str);
            //数据渲染成功后绑定事件
            this.addEvent();
        }
        //给商品绑定事件,点击跳转到商品详情页
        addEvent(){
            $(".super_time").on("click","li",function(){
               
                console.log( $(this).className())
            })
        }
    }
    new GoodsTime();

    //倒计时
    class CountDown{
        constructor(){
            this.init();
        }
        init(){
            this.hour = $(".timeout").children("div").find("span").eq(0)[0];
            this.minutes = $(".timeout").children("div").find("span").eq(1)[0];
            this.seconds = $(".timeout").children("div").find("span").eq(2)[0];
            // console.log(this.hour)
            this.coutDown(this.hour,3600000)
            this.coutDown(this.minutes,60000)
            this.coutDown(this.seconds,1000)
        }  
        //倒计时封装
        coutDown(ele,times){
            var cont = parseInt(ele.innerHTML);
            setInterval(function(){
                cont--;
                if(cont < 10){
                    ele.innerHTML = "0" + cont
                }else{
                    ele.innerHTML = cont;
                }
                if(cont < 0){
                    cont = 59;
                    ele.innerHTML = cont;
                }  
                // console.log(cont);  
            },times)
        }
    }
    new CountDown();

    //页面楼层效果
    class Floor{
        constructor(){
            this.init();
        }
        init(){
            //绑定事件按到对应内容显示对应楼层
            this.addEvent();
        }
        //事件绑定
        addEvent(){
            //点击楼层按钮,获取当前按钮下标
            var that = this;
            $("#floor_index").children("span").on("click",function(){
                that.index = $(this).index();
                // console.log(that.index);
                // 回到顶部的效果,回到顶部直接回到
                if(that.index == 5){
                    $("html").animate({
                        scrollTop:0
                    },1000)
                }else{
                    that.display();
                }
            })
        }
        //楼层动画效果
        display(){
            // console.log($(".floor").eq(this.index))
            var t = $(".floor").eq(this.index)[0].offsetTop;
            // console.log(t);
            $("html").animate({
                scrollTop:t
            },500)
        }

    }
    new Floor();
})();