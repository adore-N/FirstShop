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
                    console.log(that.res);
                    that.display();
                },
                data:{
                    goodsId:this.goods_id
                }
            })
        }
        display(){
            var goodsMsg = this.res.msg;
            console.log(goodsMsg[0].goods_simg)
            var goodsSimg = goodsMsg[0].goods_simg.split(",");
            console.log(goodsSimg);
            // console.log(goodsMsg[0])
            var str =  `<div class="img">
                            <img src="goodsimg/${goodsMsg[0].goods_img}" alt="">
                            <span></span>
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
                            <input type="button" value="加入购物车" class="gocar">
                            <input type="button" value="立即购买" class="buy">
                        </div>`;
            $(".intro_left").html(str);        
            $(".intro_right").html(str2);        
        }
    }
    new GoodsMsg();
})();