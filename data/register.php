<?php
   //接受数据
   $user_name = @$_POST["userName"];
   $user_phone = @$_POST["userPhone"];
   $user_pwd = @$_POST["userPwd"];

   //连接数据库
   $link = @new mysqli("localhost","root","root","datas");
   echo $link->connect_error;

   $sql = "INSERT userinfo(user_name,user_phone,user_pwd) VALUES ('$user_name','$user_phone','$user_pwd')";
   $q = $link->query($sql);

   if($q){
        echo '{"code":1,"msg":"注册成功"}';
   }else{
       echo '{"code":0,"msg":"注册失败"}';
   }
?>