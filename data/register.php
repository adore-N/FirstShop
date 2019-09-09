<?php
   //接受数据
   $user_name = @$_POST["userName"];
   $user_phone = @$_POST["userPhone"];
   $user_pwd = @$_POST["userPwd"];

   //连接数据库
   $link = @new mysqli("localhost","root","root","datas");
   echo $link->connect_error;

   $sql = "INSERT userinfo(user_name,user_phone,user_pwd) VALUES ('$user_name','$user_phone','$user_pwd')";
   $sql1 = "SELECT * FROM userinfo WHERE user_phone='".$user_phone."'";

   $qq = $link->query($sql1);
   

//    if($q){
//         echo '{"code":1,"msg":"注册成功"}';
//    }else{
//        echo '{"code":0,"msg":"注册失败"}';
//    }

   if($qq->num_rows > 0){
       echo '{"code":0,"msg":"登录失败"}';
    }else{
        $q = $link->query($sql);
        echo '{"code":1,"msg":"注册成功"}';
    }

?>