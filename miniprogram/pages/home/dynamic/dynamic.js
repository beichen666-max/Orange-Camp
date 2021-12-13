// miniprogram/pages/home/dynamic/dynamic.js
//初始化数据
const db = wx.cloud.database();
//获取要操纵的集合
const dylist = db.collection('dylist')
Page({

   /**
    * 页面的初始数据
    */
   data: {
      dylist:[],
   },
   goindex(){
      wx.switchTab({
         url: '/pages/home/index/index',
       })
   },
   getdylist() {
      dylist.where({
        isShow: true,
      }).get().then(res => {
        this.setData({
          dylist: res.data
        })
      })
    },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.getdylist()
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