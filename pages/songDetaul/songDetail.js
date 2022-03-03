// pages/songDetaul/songDetail.js
import PubSub from 'pubsub-js'
import request from '../../utils/request'
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    songDetail:'',
    musicId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {musicId} = options;
    this.setData({
      musicId
    })
    this.getSongDetail(musicId);
    if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId){
      this.setData({
        isPlay:true
      })
    }
    this.bgm = wx.getBackgroundAudioManager();
    this.bgm.onPlay(()=>{
      this.changePlayState(true);
      appInstance.globalData.musicId = musicId;
    });
    this.bgm.onPause(()=>{
      this.changePlayState(false);
    });
    this.bgm.onStop(()=>{
      this.changePlayState(false);
    })
  },
  changePlayState(isPlay){
    this.setData({
      isPlay
    })
    appInstance.globalData.isMusicPlay = isPlay;
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
    let isPlay = !this.data.isPlay;
    this.musicControl(isPlay,this.data.musicId);
  },
  async musicControl(isPlay,musicId){
    let muiscRes = await request('/song/url',{id:musicId})
    if(isPlay){
      this.bgm.title = this.data.songDetail.name;
      this.bgm.src = muiscRes.data[0].url;
    }else{
      this.bgm.pause();
    }
  },
  // 切歌 上一首 下一首
  switchMusic(event){
    let type = event.currentTarget.id;
    console.log(type);
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