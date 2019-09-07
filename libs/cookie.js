//   增

/**
 * key:要存储信息的键(字符) (必选)
 * value:(必选)要存储的值,写成对象的形式,同时必须转化为字符
 * option:存储的时间有效期,路径(可选)
 */
function setCookie(key,value,options){
    options = options ? options : {};
    var path = options.path ? `path=${options.path};` : "";
    if(options.expires){
        var d = new Date();
        d.setDate(d.getDate() + options.expires);
        var day = `expires=${d};`; 
    }else{
        var day = "";
    }
    document.cookie = `${key}=${value};${path}${day}`;
}   
//删除
function removeCookie(key,options){
    //设置默认配置信息
    options = options ? options : {};
    // 将有效期改为-1
    options.expires = -1;
    setCookie(key,null,options);
}
//查
function getCookie(key){
    var str = document.cookie;
    for(var i = 0;i < str.split("; ").length;i++){
        if(str.split("; ")[i].split("=")[0] == key){
            return str.split("; ")[i].split("=")[1];
        }
    }
    return "";
}