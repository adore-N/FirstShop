<?php
//   //接受数据
  $user_phone = @$_REQUEST["userPhone"];
  // $user_phone = "1";
  $user_pwd = @$_REQUEST["userPwd"];
    
  //连接数据库
  $link = @new mysqli("localhost","root","root","datas");
  echo $link->connect_error;

  $sql = "SELECT * FROM userinfo WHERE user_phone='".$user_phone."' AND user_pwd='".$user_pwd."'";
  $sql1 = "SELECT user_name FROM userinfo WHERE user_phone='".$user_phone."'";
  
  $q = $link->query($sql);
  $qq = $link->query($sql1);
  // echo $sql1;
    // echo $q;
  if($q->num_rows > 0){
      $str = "";
      while($arr = $qq->fetch_assoc()){
          $str = $str.json_encode($arr);
          // $str = $str.$arr;
      }
      // echo $str;
      echo '{"code":1,"msg":"登录成功","user_name":'.$str.'}';
    }else{
        echo '{"code":0,"msg":"登录失败"}';
  }
?>