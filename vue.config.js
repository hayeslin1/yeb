let proxyObj = {}


proxyObj['/'] = {
    // websocket
    ws: false, 
    //目标地址
    target : 'http://localhost:8081',
    //发送请求头host被设置为target
    changeOrigin: true ,
    //
    pathReWrite:{
        '^/':'/'
    }

}



module.exports= {
    devServer: {
        host:'localhost',
        port:8080, 
        proxy: proxyObj
    }
}