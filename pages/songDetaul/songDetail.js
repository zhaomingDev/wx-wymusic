// pages/songDetaul/songDetail.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    songDetail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {musicId} = options;
    this.getSongDetail(musicId)
  },
  async getSongDetail(musicId){
    let res = await request('/song/detail',{ids:musicId});
    if(res.code === 200 ){
      wx.setNavigationBarTitle({
        title: res.songs[0].name,
      })
      this.setData({
         songDetail:res.songs[0]
      })
    }
  },
  handleMusicPlay(){
    this.setData({
      isPlay:!this.data.isPlay
    })
  },
  musicControl(isPlay){
    if(isPlay){

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