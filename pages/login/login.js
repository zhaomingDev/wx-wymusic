// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleInput(event){
    let type = event.currentTarget.id;
    this.setData({
      [type]:event.detail.value
    })
  },

  async login(){
    let {phone , password} = this.data;
    let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(!phone){
      wx.showToast({
        title: '请输入手机号',
        icon:'none'
      })
      return
    }
    if(!reg.test(phone)){
      wx.showToast({
        title: '手机号格式有误',
        icon:'none'
      })
      return
    }
    if(!password){
      wx.showToast({
        title: '密码不得为空',
        icon:'none'
      })
      return
    }
    // 15711140593
    // 123456yzy
    let res = await request('/login/cellphone',{phone,password,isLogin:true})
    if(res.code === 200){
      wx.showToast({
        title: '登录成功',
      })
      wx.setStorageSync('userInfo', JSON.stringify(res.profile));
      wx.switchTab({
        url: '/pages/personal/personal',
      })
    }else if(res.code === 400){
      wx.showToast({
        title: '手机号错误',
        icon:'none'
      })
      return
    }else if(res.code === 502){
      wx.showToast({
        title: '密码错误',
        icon:'none'
      })
      return
    }else{
      wx.showToast({
        title: '芭比Q了，联系管理员',
        icon:'none'
      })
      return
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})