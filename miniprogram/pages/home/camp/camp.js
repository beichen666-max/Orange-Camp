// miniprogram/pages/home/findcamp/camp/camp.js
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
    // 该markers好像不能写在data里 需要在外面定义函数 函数包裹数组
    latitude: '{{info.latitude}}', //进入营地信息时的地点坐标 （将这两个坐标改为数据库调用 因为不同营地位置不同）
    longitude: '{{info.longitude}}', //进入营地信息时的地点坐标
    value: 3,
    info: {},
    // checks: [{
    //     name: "WC",
    //     value: '0',
    //     checked:'{{info.checked}}' ,
    //     url1: '/images2/toilet.png',
    //     url2: '/images2/toiletno.png'
    //   },
    //   {
    //     name: "充电",
    //     value: '1',
    //     checked: '{{info.checked}}' ,
    //     url1: '/images2/charge.png',
    //     url2: '/images2/chargeno.png'
    //   },
    //   {
    //     name: "帐篷",
    //     value: '2',
    //     checked:'{{info.checked}}' ,
    //     url1: '/images2/tent.png',
    //     url2: '/images2/tentno.png'
    //   },
    //   {
    //     name: "供水",
    //     value: '3',
    //     checked:'{{info.checked}}' ,
    //     url1: '/images2/water.png',
    //     url2: '/images2/waterno.png'
    //   },
    //   {
    //     name: "做饭",
    //     value: '4',
    //     checked:'{{info.checked}}' ,
    //     url1: '/images2/cook.png',
    //     url2: '/images2/cookno.png'
    //   },
    //   {
    //     name: "购物",
    //     value: '5',
    //     checked: '{{info.checked}}',
    //     url1: '/images2/shopping.png',
    //     url2: '/images2/shoppingno.png'
    //   },
    //   {
    //     name: "运动",
    //     value: '6',
    //     checked: '{{info.checked}}',
    //     url1: '/images2/sport.png',
    //     url2: '/images2/sportno.png'
    //   },
    //   {
    //     name: "污水",
    //     value: '7',
    //     checked: '{{info.checked}}',
    //     url1: '/images2/treatement.png',
    //     url2: '/images2/treatementno.png'
    //   },
    // ],
    // 选择营地1.0结束
  },
  // 选择营地开始
  // clicks: function (e) {
  //   let index = e.currentTarget.dataset.index;
  //   let arrs = this.data.checks;
  //   if (arrs[index].checked == false) {
  //     arrs[index].checked = true;
  //   } else {
  //     arrs[index].checked = false;
  //   }
  //   this.setData({
  //     checks: arrs
  //   })
  // },
  getinfolist(id) {
    // infolist.where({
    //   isShow:true,
    //   _id:id
    // })
    infolist.doc(id)
      .get().then(res => {
        this.setData({
          info: res.data
        })
      })
  },

  gocomment() {
    wx.navigateTo({
      url: '../comment/comment',
    })
  },
  // 出发去这按钮绑定函数   开始
  navigate() {
    wx.openLocation({
      latitude: this.data.markers[0].latitude, //将经纬度改为数据库调用 因为不同的营地经纬度不同
      longitude: this.data.markers[0].longitude,
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
    this.getinfolist(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.setData({
        markers: [{
          iconPath: "/images4/location.png",
          latitude: this.data.info.latitude, //如何在数组中从数据库调取经纬度  该数组既包括界面进入标点的位置，也包括出发去这儿的终点位置  res.latitude
          longitude: this.data.info.longitude,
          width: 30,
          height: 30
        }],
      })

    }, 1000)

    setTimeout(() =>{
      this.setData({
        checks: [{
          name: "WC",
          value: '0',
          checked: this.data.info.checked[0] ,
          url1: '/images2/toilet.png',
          url2: '/images2/toiletno.png'
        },
        {
          name: "充电",
          value: '1',
          checked:  this.data.info.checked[1],
          url1: '/images2/charge.png',
          url2: '/images2/chargeno.png'
        },
        {
          name: "帐篷",
          value: '2',
          checked: this.data.info.checked[2] ,
          url1: '/images2/tent.png',
          url2: '/images2/tentno.png'
        },
        {
          name: "供水",
          value: '3',
          checked: this.data.info.checked[3],
          url1: '/images2/water.png',
          url2: '/images2/waterno.png'
        },
        {
          name: "做饭",
          value: '4',
          checked: this.data.info.checked[4],
          url1: '/images2/cook.png',
          url2: '/images2/cookno.png'
        },
        {
          name: "购物",
          value: '5',
          checked:  this.data.info.checked[5],
          url1: '/images2/shopping.png',
          url2: '/images2/shoppingno.png'
        },
        {
          name: "运动",
          value: '6',
          checked:  this.data.info.checked[6],
          url1: '/images2/sport.png',
          url2: '/images2/sportno.png'
        },
        {
          name: "污水",
          value: '7',
          checked: this.data.info.checked[7],
          url1: '/images2/treatement.png',
          url2: '/images2/treatementno.png'
        },
      ],
      })
    },1000)
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