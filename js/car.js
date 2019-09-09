;(function(){
    class ShopCar{
        constructor(){
            //获取本地存储,后面使用
            this.goodsMsg = JSON.parse(localStorage.getItem("goodsToCar"));
            this.init();
        }
        //初始化根据本地存储是否有数据进判断,渲染页面
        init(){
            // console.log(this.goodsMsg)
            if(this.goodsMsg == null){
               //没有数据的时候,给用户信息提示
               $(".car_empty").css("display","block");
            }else{
                $(".car_empty").css("display","none");
                $(".car_more").css("display","block");
                $(".payfor").css("display","block");
            }
            //获取本地存储数据进行页面渲染
            this.display();
        }
        display(){
            console.log(this.goodsMsg);
            var str = "";
            for(var i = 0;i < this.goodsMsg.length;i++){
                str += `<div class="car_goods" id="${this.goodsMsg[i].Id}">
                            <ul>
                                <li>
                                    <input type="checkbox" class="checkOne"  id="checkOne">
                                </li>
                                <li>
                                    <img src="goodsimg/${this.goodsMsg[i].goods_img}" alt="" style="width: 75px;height:75px;">
                                    <p>${this.goodsMsg[i].goods_intro}</p>
                                </li>
                                <li>${this.goodsMsg[i].goods_price}</li>
                                <li>
                                    <div class="gobuy_num">
                                        <i class="radius">-</i>
                                        <input type="text" value="${this.goodsMsg[i].num}" >
                                        <i class="add">+</i>
                                    </div>
                                </li>
                                <li>${this.goodsMsg[i].goods_price * this.goodsMsg[i].num}</li>
                                <li><input type="button" value="" id="delete" class="delete"></li>
                            </ul>
                        </div>`;
            }
            $(".car_body").append(str);
            //数据渲染成功绑定事件
            this.addEvent();
        }
        addEvent(){
            console.log(1)
            //单个商品点击增加数量,价格发生变化
            $(".gobuy_num").find("input").on("input",function(){
                //使用正则判断,假设用户输入的不是数字,后者负数,则值为1
                var reg = /^\d*$/g;
                if(!reg.test($(this).val())){
                    $(this).val(1)
                }
            })
            //点击增加数量加一
            $(".gobuy_num").find(".add").on("click",function(){               
            //    console.log(1)
                $(this).siblings("input").val(($(this).siblings("input").val()) *1 + 1);
                //同时改变单个商品的总价
                $(this).parent().parent().next().html($(this).parent().parent().prev().html() * $(this).siblings("input").val())
                
            })
            $(".gobuy_num").find(".radius").on("click",function(){               
                $(this).siblings("input").val(($(this).siblings("input").val()) * 1 - 1);
                if($(this).siblings("input").val() < 1){
                    $(this).siblings("input").val(1);
                }
                $(this).parent().parent().next().html($(this).parent().parent().prev().html() * $(this).siblings("input").val())
            })

            // if($("#checkAll").checked == ){}
            console.log($(".checkAll"))
        }
    }
    new ShopCar();
})();