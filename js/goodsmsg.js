;(function(){
    //商品详情数据渲染,通过获取URL上面商品的id来
    //请求数据,进行页面渲染
    class GoodsMsg{
        constructor(){
            //获取URL信息
            this.init();
        }
        //获取URL的内容.进行处理
        init(){
            var that = this;
            //获取URL?后面的数据
            this.url = location.search;
            //该方法decodeURIComponent转译中文字符
            this.goods_id = decodeURIComponent(this.url.split("=")[1]);
            // console.log(this.goods_id);
            // console.log(this.goods_type);
            //获取到商品id,请求数据
            $.ajax({
                url:"http://localhost/project_two/projectshop/data/goodsmsg.php",
                success:function(res){
                    that.res = JSON.parse(res)
                    // console.log(that.res);
                    that.display();
                    //在页面渲染成功之后才实例化放大镜
                    new Magnifier();
                    // 数据渲染成功,才可以操作
                    new GoodsDetal();
                    //倒计时
                    new CountDown();
                },
                data:{
                    goodsId:this.goods_id
                }
            }) 
        }
        display(){
            var goodsMsg = this.res.msg;
            // console.log(goodsMsg[0].goods_simg)
            var goodsSimg = goodsMsg[0].goods_simg.split(",");
            // console.log(goodsSimg);
            // console.log(goodsMsg[0])
            var str =  `<div class="img">
                            <img src="goodsimg/${goodsMsg[0].goods_img}" alt="">
                            <span></span>
                           <p></p>
                        </div>
                        <div class="bigimg"><img src="goodsimg/${goodsMsg[0].goods_img}" alt=""></div>
                        <div class="img_s">
                            <img src="goodsintroimg/${goodsSimg[0]}" alt="">
                            <img src="goodsintroimg/${goodsSimg[1]}" alt="">
                            <img src="goodsintroimg/${goodsSimg[2]}" alt="">
                            <img src="goodsintroimg/${goodsSimg[3]}" alt="">
                            <img src="goodsintroimg/${goodsSimg[4]}" alt="">    
                        </div>`;
            var str2 = `<h5 class="te">${goodsMsg[0].goods_intro}</h5>
                        <div class="goods_price">
                            <div class="timeout">
                                <p>距离结束还有</p>
                                <div>
                                    <span id="abc">12</span>
                                    <em>:</em>
                                    <span>59</span>
                                    <em>:</em>
                                    <span>59</span>
                                </div>   
                            </div>
                        </div>
                        <h4>抢购价<i>￥${goodsMsg[0].goods_price}元</i></h4>
                        <ul>
                            <li>选择颜色</li>
                            <li><img src="goodsimg/${goodsMsg[0].goods_img}" alt="">红大幅度</li>
                            <li><img src="goodsimg/${goodsMsg[0].goods_img}" alt="">红大幅度</li>
                            <li><img src="goodsimg/${goodsMsg[0].goods_img}" alt="">红大幅度</li>
                        </ul>
                        <ul>
                            <li>选择版本</li>
                            <li>全网通</li>
                            <li>全网通</li>
                            <li>全网通</li>
                        </ul>
                        <ul>
                            <li>选择套装</li>
                            <li>官方标配</li>
                            <li>优惠套装</li>
                        </ul>
                        <div class="gobuy">
                            <div class="gobuy_num">
                                <input type="text" value="1">
                                <i class="add">+</i>
                                <i class="radius">-</i>
                            </div>
                            <input type="button" value="加入购物车" class="gocar">
                            <input type="button" value="立即购买" class="buy">
                        </div>`;
            $(".intro_left").html(str);        
            $(".intro_right").html(str2);        
        }
    }
    new GoodsMsg();

    //商品细节信息图片切换,//点击图片,切换图片
    class GoodsDetal{
        constructor(){
            this.addEvent();
        }
        addEvent(){
            $(".img_s").children("img").on("click",function(){
                $(this).css("border","2px solid #999").siblings().css("border","2px solid #fff");
                $(".img").find("img").attr("src",$(this).attr("src"));
                $(".bigimg").find("img").attr("src",$(this).attr("src"));
            })
        }
    }
    //放大镜功能的实现
    class Magnifier{
        constructor(){
            //绑定事件
            this.addEvent();
        }
        //给移入移出时,放大镜效果消失
        addEvent(){
            //移入移出效果
            $(".intro_left").children(".img").hover(function(){
                // console.log(1)
                $(".bigimg").css("display","block")
                $(".img").children("span").css("display","block");
                // var a = $(".bigimg")[0].offsetWidth;
                // var b = $(".bigimg").children("img")[0].offsetWidth;

            },function(){
                $(".bigimg").css("display","none");
                $(".img").children("span").css("display","none");
                // console.log(2)
            });
            //鼠标移动事件
            $(".intro_left").children(".img").mousemove(function(eve){
                var e = eve || window.event;
                // console.log(e.offsetX);
                var l = e.offsetX - ($(".intro_left").find("span")[0].offsetWidth)/2;
                var t = e.offsetY - ($(".intro_left").find("span")[0].offsetHeight)/2;
                // console.log(l,t)
                if(l < 0){
                    l = 0;    
                }
                if(l > $(".img")[0].offsetWidth  - $(".img").find("span")[0].offsetWidth) {
                    l = $(".img")[0].offsetWidth  - $(".img").find("span")[0].offsetWidth;
                }
                if(t < 0){
                    t = 0;
                } 
                if(t > $(".img")[0].offsetHeight - $(".img").find("span")[0].offsetHeight){
                    l = $(".img")[0].offsetHeight  - $(".img").find("span")[0].offsetHeight;
                }

                $(".intro_left").find("span").css({
                    "left":l,
                    "top":t
                })

                //计算比例设置大图位置
                var x = l / ($(".img").children("img")[0].offsetWidth - $(".img").children("span")[0].offsetWidth);
                var y = t / ($(".img").children("img")[0].offsetHeight - $(".img").children("span")[0].offsetHeight);

                //设置大图位置
                $(".bigimg").find("img").css({
                    "left": x * ($(".bigimg")[0].offsetWidth - $(".bigimg").find("img")[0].offsetWidth),
                    "top": y  * ($(".bigimg")[0].offsetHeight - $(".bigimg").find("img")[0].offsetHeight)
                })
            })
        }
    }
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
})();