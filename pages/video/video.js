// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNum:0,
    videoGroupList:[],
    navId:'',
    videoList:[],
    videoId:'',
    videoUpdateTime:[],
    isTriggered:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupList();
  },

  // 获取导航条数据
  async getVideoGroupList(){
    let res = await request("/video/group/list");
    this.setData({
      groupList:res.data.splice(0,14),
      navId:res.data[0].id
    })
    this.getVidelList(this.data.navId)
  },

  bindActive(event){
    let id = event.currentTarget.dataset.id;
    this.setData({
      activeNum:event.currentTarget.dataset.index,
      navId:id
    })
    this.getVidelList(id)
  },
  //获取列表数据
  async getVidelList(navId){
    this.setData({
      videoList:[]
    })
    wx.showLoading({
      title: '正在加载',
    })
    let res = await request("/video/group",{id:navId});
    wx.hideLoading();
    this.setData({
      videoList:res.datas,
      isTriggered:false
    })
  },

  playVideo(event){
    let vid = event.currentTarget.id;
    this.setData({
      videoId:vid
    })
    // 用户第一次点击，让他正常播放。同时赋值vid。
    // 第二次点击，判断是不是点击同一首。要关闭其他播放的，播放正在点击的
    let {videoUpdateTime} = this.data;
    let videoItem = videoUpdateTime.find(v=> v.vid === vid)
    if(!this.videoContext){
      // 创建video标签的实例对象
      this.videoContext = wx.createVideoContext(vid);
      this.videoContext.play();
    }else{
      if(this.vid != vid){
        this.videoContext = wx.createVideoContext(vid);
        // this.videoContext.stop();
        this.videoContext.play();
      }
    }
    this.vid = vid
  },

  handleTimeUpdadte(event){
    let timeObj = {
      vid:event.currentTarget.id,
      currentTime:event.detail.currentTime
    }
    let {videoUpdateTime} = this.data;
    let videoItem =  videoUpdateTime.find(v=>v.vid === timeObj.vid)
    if(videoItem){
      videoItem.currentTime = event.detail.currentTime;
    }else{
      videoUpdateTime.push(timeObj);
    }
    this.setData({
      videoUpdateTime
    })
  },

  handleRefresher(){
    this.getVidelList(this.data.navId);
  },
  handleToLower(){

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