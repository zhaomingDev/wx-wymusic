import config from './config'
//发送请求
export default(url,data = {},method = 'GET')=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url:config.host + url,
      data,
      method,
      header: {
        // 会返回很多cookie , 只拿 MUSIC_U 开头的
        cookie: wx.getStorageSync('cookie') ? wx.getStorageSync('cookie').find( item => item.indexOf('MUSIC_U') !== -1 ) : ''
      },
      // header: {
      //   'content-type': 'application/x-www-form-urlencggoded;charset=UTF-8'
      //   //Formdata 请求头
      // },
      success:(res)=>{
        // 只有登录才存cookies
        if(data.isLogin){
          wx.setStorageSync('cookie', res.cookies)
        }
        resolve(res.data)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}