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
                str += ``;
            }
        }
    }
    new ShopCar();
})();