<?php
    //   //接受数据
    $goods_id = @$_REQUEST["goodsId"];
    // $goods_id = "1";
    // $goods_type = "秒杀";
    // $user_pwd = @$_REQUEST["userPwd"];
    
    //连接数据库
    $link = @new mysqli("localhost","root","root","datas");
    echo $link->connect_error;

    // $sql = "SELECT * FROM three WHERE user_phone='".$user_phone."' AND user_pwd='".$user_pwd."'";
    $sql = "SELECT * FROM goodsinfo WHERE Id='".$goods_id."'";

    // echo $sql;
    $q = $link->query($sql);
    // $qq = $link->query($sql1);
    // echo $sql1;
    // echo $q;
    if($q->num_rows > 0){
        $str = "";
        while($arr = $q->fetch_assoc()){
            $str = $str.json_encode($arr).",";
        }
        $str = "[".substr($str,0,-1)."]";
        echo '{"code":1,"msg":'.$str.'}';
    }else{
        echo '{"code":0,"msg":"没有数据"}';
    }
?>