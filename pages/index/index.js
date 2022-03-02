// pages/index/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    recommedList:[],
    topList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    // wx.request({
    //   url: 'http://localhost:3000/banner',
    //   data:{type:2},
    //   success:(res)=>{
    //     console.log("res",res);
    //   },
    //   fail:()=>{
    //     console.log('失败');
    //   }
    // })
    // 轮播图
    let bannerListData = await request('/banner',{type:2})
    this.setData({
      bannerList:bannerListData.banners
    })
    // 推荐歌单
    let recommedListData = await request('/personalized',{limit:20})
    this.setData({
      recommedList:recommedListData.result
    })
    // 排行版
    let index = 0;
    let resultArry = []
    while(index<5){
      let topListData = await request('/top/list',{idx:index ++ })
      let topListItem ={name:topListData.playlist.name,tracks:topListData.playlist.tracks.slice(0,3)}
      resultArry.push(topListItem)
      this.setData({
        topList:resultArry
      })
    }
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