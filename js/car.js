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
                //获取本地存储数据进行页面渲染
                this.display();
            }
        }
        display(){
            // console.log(this.goodsMsg);
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
            var that = this;
            // console.log(1)
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
                //商品被选中时:增加商品数量,改变商品总价格
                if($(this).parent().parent().parent().find(".checkOne")[0].checked == true){
                    that.howMoney()
                }
            })
            $(".gobuy_num").find(".radius").on("click",function(){  
                //点击减少商品个数             
                $(this).siblings("input").val(($(this).siblings("input").val()) * 1 - 1);
                if($(this).siblings("input").val() < 1){
                    $(this).siblings("input").val(1);
                }
                $(this).parent().parent().next().html($(this).parent().parent().prev().html() * $(this).siblings("input").val())
                //商品被选中时:减少商品数量,改变商品总价格
                if($(this).parent().parent().parent().find(".checkOne")[0].checked == true){
                    that.howMoney()
                }
            })
            //点击全选按钮,所有商品都被选上
            // 上面全选按钮
            $(".checkAll").eq(0).on("click",function(){
                if($(".checkAll")[0].checked == true){
                    $(".checkOne").prop("checked",true);
                    $(".checkAll")[1].checked = true;
                    that.howMoney()
                }else{
                    $(".checkOne").prop("checked",false);
                    $(".checkAll")[1].checked = false;
                    $(".payfor_right").find("em").html(0);
                    $(".payfor_right").find("i").html(0);
                }
            })
            // 下面全选按钮
            $(".checkAll").eq(1).on("click",function(){
                if($(".checkAll")[1].checked == true){
                    $(".checkOne").prop("checked",true);
                    $(".checkAll")[0].checked = true;
                    that.howMoney()
                }else{
                    $(".checkOne").prop("checked",false);
                    $(".checkAll")[0].checked = false;
                    $(".payfor_right").find("em").html(0);
                    $(".payfor_right").find("i").html(0);
                }
            })
            //给每个商品的复选框绑定事件
            $(".car_goods").find(".checkOne").on("click",function(){
                if($(this)[0].checked == false){
                    $(".checkAll").prop("checked",false);
                }
                that.howMoney()
            })
            //给删除按钮绑定事件
            $(".car_goods").find(".delete").on("click",function(){
                // console.log(1)
                // 点击的商品id
                var deleteId = $(this).parent().parent().parent().attr("id")
                //点击删除按钮,在页面删除该元素,同时删除本地存储
                console.log(deleteId)
                $(this).parent().parent().parent().remove();
                var localGoods = JSON.parse(localStorage.getItem("goodsToCar"));
                console.log(localGoods);
                // 循环遍历本地存储,得到要删除的商品的对应id,删除该数组元素
                for(var i = 0;i < localGoods.length;i++){
                    if(deleteId == localGoods[i].Id){
                        localGoods.splice(i,1);
                    }
                }
                // console.log(localGoods);
                localStorage.setItem("goodsToCar",JSON.stringify(localGoods));
                that.howMoney();
            })
        }
        // 封住方法(选中的商品计算价格)
        howMoney(){
            //商品总价
            // 循环遍历每个div,获取到每个div里面单个商品的总价
            var sum = 0;
            //商品总个数
            var num = 0;
            for(var i = 0;i < $(".car_goods").length;i++){
                if($(".car_goods").eq(i).find(".checkOne")[0].checked == true){
                    num += parseInt($($(".car_goods")[i]).find("li").eq(3).find("input").val());
                    sum += parseInt($($(".car_goods")[i]).find("li").eq(4).html())
                }
            }
            $(".payfor_right").find("em").html(sum);
            $(".payfor_right").find("i").html(num);
        } 
    }
    new ShopCar();
})();