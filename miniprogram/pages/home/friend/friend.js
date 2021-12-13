// miniprogram/pages/home/friend/friend.js
//初始化数据
const db = wx.cloud.database();
//获取要操纵的集合
const friendlist = db.collection('friendlist')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendlist:[],
  },
  // 左上角跳转
  goindex() {
    wx.switchTab({
      url: '/pages/home/index/index',
    })
  },

  getfriendlist() {
    friendlist.where({
      isShow: true,
    }).get().then(res => {
      this.setData({
        friendlist: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getfriendlist()
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
    this.getfriendlist()
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