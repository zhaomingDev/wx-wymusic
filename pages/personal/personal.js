import request from '../../utils/request'
// pages/personal/personal.js
let startY = 0;   // 手指起始坐标
let moveY = 0;    // 手指移动坐标
let moveDistance = 0; // 手指移动距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTsY:"translateY(0)",
    coverTron:"",
    userInfo:{},
    recentPlayList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      this.setData({
        userInfo:JSON.parse(userInfo)
      })
    }
    // 获取用户最近播放歌曲
    this.getRecentPlayList(this.data.userInfo.userId);
  },

  bindtouchStart(e){
    this.setData({
      coverTron:""
    })
    // 获取手指的起始坐标
    startY = e.touches[0].clientY;
  },
  bindtouchMove(e){
    moveY = e.touches[0].clientY;
    moveDistance = moveY - startY;
    if(moveDistance <=0){
     return
    }
    if(moveDistance >= 80 ){
      moveDistance = 80
     }
    this.setData({
      coverTsY:`translateY(${moveDistance}rpx)`
    })
  },
  bindtouchEnd(){
    this.setData({
      coverTsY:`translateY(0)`,
      coverTron:"all 300ms linear"
    })
  },
  toLogin(){
    if(this.data.userInfo.nickname){
      return
    }
    wx.reLaunch({
      url: '/pages/login/login'
    })
  },

  async getRecentPlayList(userId){
    let res = await request('/user/record',{uid: userId,type : 1})
    if(res.code === 200){
      this.setData({
        recentPlayList:res.weekData.splice(0,10)
      })
    }
    console.log("this.recentPlayList",this.data.recentPlayList);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

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