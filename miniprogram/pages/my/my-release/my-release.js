// miniprogram/pages/my/my-release/my-release.js
//初始化数据
const db = wx.cloud.database();
//获取要操纵的集合
const publishlist = db.collection('publishlist')
Page({

   /**
    * 页面的初始数据
    */
   data: {
      value1: 0,
      value2: 'a',
      value3: 0,
      value4: '11',
      value5: '22',
      publishlist: [],
      filter: {}
   },
   gomy(){
      wx.switchTab({
         url: '../mine/mine',
       })
   },
   goinfo(e) {
      wx.navigateTo({
        url: '/pages/home/camp/camp?id=' + e.currentTarget.dataset.idp._id,
      })
    },
     // 获取营地信息列表
  getpublishlist() {
   publishlist.where({
     isShow: true,
   }).get().then(res => {
     this.setData({
       publishlist: res.data
     })
   })
 },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.getpublishlist()
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