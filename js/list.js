;(function(){
    //商品列表页面主要是用户搜索的时候把商品关键字拼接到URL后面,
    //获取URL后面的数据,请求数据,进行页面渲染
    class GoodsList{
        constructor(){
            //获取URL信息
            this.init();
            //提前绑定事件(渲染之后绑定事件也可以)
            this.addEvent();
        }
        //获取URL的内容.进行处理
        init(){
            var that = this;
            //获取URL?后面的数据
            this.url = location.search;
            //该方法decodeURIComponent转译中文字符
            this.goods_type = decodeURIComponent(this.url.split("=")[1]);
            // console.log(this.goods_type);
            //获取到商品类型,关键字,请求数据
            $.ajax({
                url:"http://localhost/project_two/projectshop/data/goodstime.php",
                success:function(res){
                    that.res = JSON.parse(res)
                    // console.log(that.res);
                    if(that.res.code == 1){
                        that.display();
                    }else{
                        that.displayEmpty();
                    }
                },
                data:{
                    goodsType:this.goods_type
                }
            })
        }
        //查询到数据,进行页面渲染
        display(){
            // console.log(this.res.msg);
            var str = "";
            for(var i = 0;i < this.res.msg.length;i++){
                str += `<div class="goods_box" id=${this.res.msg[i].Id}>
                            <img abc_src="goodsimg/${this.res.msg[i].goods_img}" alt="" class="lazy_img">
                            <span>￥${this.res.msg[i].goods_price}元</span>
                            <p>${this.res.msg[i].goods_name}</p>
                            <em>查看详情</em>
                            <i>荣耀官方旗舰店></i>
                        </div>`;
            }
            $(".goodsList").html(str);
            //数据成功,执行懒加载
            this.displayLazy();
        }
        //懒加载
        displayLazy(){
            //页面可视区域的高度
            var clientH = document.documentElement.clientHeight;
            // console.log($(".lazy_img"));
            //初始页面时:在页面可视区域内的图片需要显示
            for(var i = 0;i < 5;i++){
                $(".lazy_img").eq(i).attr("src",$(".lazy_img").eq(i).attr("abc_src"));
            }
            //当用户开始滚动的时候,开始加载图片
            $(document).on("scroll", function(){
                var scrTop = document.documentElement.scrollTop;
                // console.log($(".lazy_img")[1].offsetTop)//原生的写法
                // console.log($(".lazy_img").eq(1).offset().top)//jq的写法
                for(var i = 5;i < $(".lazy_img").length;i++){
                    if(scrTop > $(".lazy_img").eq(i).offset().top - clientH){
                        $(".lazy_img").eq(i).attr("src",$(".lazy_img").eq(i).attr("abc_src"));
                    }
                }
            })
        }
        //没有查询到数据,显示没有找到该商品
        displayEmpty(){
            $(".goodsList").html("<div>")
            .children("div").html("对不起,没有找到相关商品")
            .css({
                "color":"#333",
                "textAlign":"center",
                "paddingTop":"50px"
            });
        }
        //数据渲染成功后,绑定事件,当点击该商品时,跳转到商品详情页
        addEvent(){
            //事件委托
            $(".goodsList").on("click",".goods_box",function(){
                // console.log($(this))
                // console.log($(this).attr("Id"));
                //把商品id绑定到URL上面
                window.open("http://localhost/project_two/projectshop/goodsmsg.html?goodsId="+$(this).attr("Id"));
            })
        }
    }
    new GoodsList();
})();