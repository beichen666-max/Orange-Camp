// miniprogram/pages/home/findcamp/camp/camp.js
//初始化数据
const db = wx.cloud.database();
//获取要操纵的集合
const travellist = db.collection('travellist')
//获取查询指令
// const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {

    value: 3,
    travel: {},

  },

  gettravellist(id) {
    travellist.doc(id)
      .get().then(res => {
        this.setData({
          travel: res.data
        })
      })
  },


  // 出发去这按钮绑定函数   结束

  onChange(event) {
    this.setData({
      value: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gettravellist(options.id)
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