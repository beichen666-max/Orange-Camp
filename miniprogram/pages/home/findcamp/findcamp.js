// miniprogram/pages/home/findcamp/findcamp.js
//初始化数据
const db = wx.cloud.database();
//获取要操纵的集合
const infolist = db.collection('infolist')
//获取查询指令
// const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option1: [{
        text: '城市',
        value: 0
      },
      {
        text: '哈尔滨',
        value: 1
      },
      {
        text: '广州',
        value: 2
      },
      {
        text: '洛阳',
        value: 3
      },
      {
        text: '大连',
        value: 4
      },
      {
        text: '北京',
        value: 5
      },
      {
        text: '上海',
        value: 6
      },
      {
        text: '云南',
        value: 7
      },
      
      {
        text: '苏州',
        value: 8
      },
      {
        text: '海南',
        value: 9
      },

    ],
    option2: [{
        text: '推荐',
        value: 'a'
      },
      {
        text: '热度排序',
        value: 'b'
      },
      {
        text: '好评排序',
        value: 'c'
      },
    ],
    option3: [{
        text: '距离',
        value: 0
      },
      {
        text: '5km',
        value: 5
      },
      {
        text: '10km',
        value: 10
      },
      {
        text: '20km',
        value: 20
      },
    ],
    option4: [{
      text: '水电',
      value: '11'
    }, ],
    option5: [{
      text: '排污',
      value: '22'
    }, ],
    value1: 0,
    value2: 'a',
    value3: 0,
    value4: '11',
    value5: '22',
    infolist: [],
    filter: {}
  },
  // 切换显示的内容
  onChange(event) {
    // wx.showToast({
    //   // title: `切换到标签 ${event.detail.name}`,
    //   // icon: 'none',
    // });
  },
  // 筛选导航开始
  changeCity(e) {
    this.data.value1 = e.detail
    if (e.detail != 0) {
      this.data.filter = {
        ...this.data.filter,
        city: this.data.value1
      }
    }else{
      delete  this.data.filter.city
    }
    this.getinfolist(this.data.filter)
  },
  changeDistance(e) {
    this.data.value1 = e.detail
    if (e.detail != 0) {
      this.data.filter = {
        ...this.data.filter,
        distance: this.data.value1
      }
    }else{
      delete  this.data.filter.distance
    }
    this.getinfolist(this.data.filter)
  },
// 筛选导航结束
  // 移动当前位置开始
  moveCenter: function (res) {
    // console.log(res);
    let index_lat = "markers[0].latitude";
    let index_lng = "markers[0].longitude";
    this.setData({
      [index_lat]: res.detail.latitude,
      [index_lng]: res.detail.longitude
    })
  },
  // 移动当前位置结束
  // 点击地图上的点进行跳转
  // 待解决问题 ：地图对应的跳转id 如何赋予
  gocamp(e){
    wx.navigateTo({
      url: '../camp/camp?id=' + e.currentTarget.dataset.idp._id,//难点：点击不同的营地标点跳转到不同的营地界面
    })
  },
  // 获取营地信息列表
  getinfolist(obj) {
    infolist.where({
      isShow: true,
      ...obj
    }).get().then(res => {
      this.setData({
        infolist: res.data
      })
    })
  },
  // 跳转搜索页面
  gosearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  goinfo(e) {
    wx.navigateTo({
      url: '../camp/camp?id=' + e.currentTarget.dataset.idp._id,
    })
  },

  // 获取当前位置函数  并且  添加营地信息 开始
  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      success: function (res) {
        // console.log(res);
        that.setData({
          markers: [{
              latitude: res.latitude,
              longitude: res.longitude,
              iconPath: "/images4/mylocation.png",
              width: 30,
              height: 30,
              callout: {
                content: "当前位置",
                color: '#000000',
                fontSize: 13,
                borderRadius: 3,
                borderWidth: 1,
                padding: 3,
                display: 'ALWAYS'
              }
            },
            {
              latitude: 45.790782,
              longitude: 126.597965,
              title: "太阳岛风景区",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 45.783927,
              longitude: 126.567945,
              title: "冰雪大世界",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 45.809479,
              longitude: 126.585741,
              title: "哈尔滨大剧院",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 45.817351,
              longitude: 126.601711,
              title: "东北虎林园",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 45.769661,
              longitude: 126.598701,
              title: "哈尔滨防汛路",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 45.708832,
              longitude: 126.623421,
              title: "南岗测绘路",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 45.794995,
              longitude: 126.516707,
              title: "哈尔滨松北区人民政府",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 39.705481,
              longitude: 116.313,
              title: "北京念坛公园",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 40.008502,
              longitude: 116.394691,
              title: "北京奥林匹克塔",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 39.8436,
              longitude: 116.225452,
              title: "【北京】绿堤公园",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 23.183941,
              longitude: 113.287235,
              title: "【广州】白云山景区",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 23.106151,
              longitude: 113.324601,
              title: "【广州】广州塔",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 23.037058,
              longitude: 113.405574,
              title: "【广州】大学城岭南印象园",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 22.995644,
              longitude: 113.327884,
              title: "【广州】长隆房车营地",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 34.643112,
              longitude: 112.451847,
              title: "【洛阳】洛阳博物馆",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 23.099221,
              longitude: 113.375703,
              title: "【广州】琶洲塔",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude:38.876598,
              longitude: 121.572015,
              title: "【大连】星海湾房车营地",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 39.069707,
              longitude: 121.986912,
              title: "【大连】金石滩风景区",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 38.875436,
              longitude: 121.598651,
              title: "【大连】滨海西路",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
            {
              latitude: 38.930322,
              longitude: 121.674645,
              title: "【大连】东港商务区",
              iconPath: "/images4/location.png",
              width: 30,
              height: 30
            },
          ]
        })
      }
    })
    this.getinfolist()
  },

  // // 获取当前位置函数  并且  添加营地信息 结束

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