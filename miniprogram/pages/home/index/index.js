Page({
  data: {
    list:[],
    swiperlist: [{
			id: 0,
			url: 'cloud://cloud1-1g0683vye29ecd9b.636c-cloud1-1g0683vye29ecd9b-1305369412/swiper/index1.jpg',
			type: 1
		}, {
			id: 1,
			url: 'cloud://cloud1-1g0683vye29ecd9b.636c-cloud1-1g0683vye29ecd9b-1305369412/swiper/index2.jpg',
			type: 2

		}, {
			id: 2,
			url: 'cloud://cloud1-1g0683vye29ecd9b.636c-cloud1-1g0683vye29ecd9b-1305369412/swiper/index3.jpg',
			type: 3
		}, {
			id: 3,
			url: 'cloud://cloud1-1g0683vye29ecd9b.636c-cloud1-1g0683vye29ecd9b-1305369412/swiper/index4.jpg',
			type: 4
    }, {
			id: 4,
			url: 'cloud://cloud1-1g0683vye29ecd9b.636c-cloud1-1g0683vye29ecd9b-1305369412/swiper/index5.jpg',
			type: 5
    }, {
			id: 5,
			url: 'cloud://cloud1-1g0683vye29ecd9b.636c-cloud1-1g0683vye29ecd9b-1305369412/swiper/index6.jpg',
			type: 6
    }, {
			id: 6,
			url: 'cloud://cloud1-1g0683vye29ecd9b.636c-cloud1-1g0683vye29ecd9b-1305369412/swiper/index7.jpg',
			type: 7
    }, {
			id: 7,
			url: 'cloud://cloud1-1g0683vye29ecd9b.636c-cloud1-1g0683vye29ecd9b-1305369412/swiper/index8.jpg',
			type: 8
    }],
    Headlines: [{
			id:1,
			title:"世界这么大，我想去看看",
			type: 1
		},{
			id:2,
			title:"保持热爱，奔赴山海",
			type: 2
		},{
			id:3,
			title:"在路上，在家中",
			type: 3
		}],
  },
staticData: {
  inputValue: ""
},
gosearch(){
  wx.navigateTo({
    url: '/pages/search/search',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  // 在逻辑文件search.js中，在data中存放list的数据，为空数组，
  // 存放搜索列表的数据，同时定义staticData，在里面定义inputValue，
  // 里面为空字符串，是input输入框的值，
  onLoad: function () {
    this.getSearchResult("");
  },
  // 在search.js的onLoad()生命周期函数中，调用请求数据的函数
  // getSearchResult()，这样在一进入页面的时候就会获取到所有的数据，
  // 不过由于并没有关键字keyword，需要传空字符串，
  getSearchResult(keyword) {
    wx.request({
         url: 'xxxxxx',
         data: {
           keyword: this.staticData.inputValue
         },
         method: "POST",
         header: {
           'content-type': 'application/x-www-form-urlencoded' 
         },
         success: this.getSearchResultSucc.bind(this)
    })
   },
  //  在search.js中，定义一个响应成功后的函数getSearchResultSucc()，判断
  //  响应的数据是否存在。如果存在通过this.setData()方法将响应后的数据赋值
  //  给list，如果不存在，list仍然为空数组，代码如下所示：
   getSearchResultSucc(res) {
    // console.log(res)
    if (res.data.ret) {
      const result = res.data.data;
      this.setData({
        list: result
      })
    } else {
      this.setData({
        list: []
      })
    }
},
// 在search.js中，定义handleInputChange()函数，这个函数也是input输入框
// 绑定的函数，传入事件对象e，然后通过e.detail.value赋值给staticData的inputValue，
handleInputChange(e) {
  this.staticData.inputValue = e.detail.value;
},
// 在search.js中，定义handleSearch()函数，这个函数也是之前搜索按钮
// 所绑定的函数，在这个里面重新发起一次请求，携带keyword关键字发起请求，
handleSearch (keyword) {
  this.getSearchResult(keyword)
},
// 如果想要点击在搜索以后显示的列表，可以在列表中绑定handleItemTap()事件，
// 传入事件对象e，通过 e.currentTaret.id去获取到点击的id，然后再通过 
// wx.navigateTo()方法跳转到相应的详情页，代码如下所示：
handleItemTap(e) {
  wx.navigateTo({
    url: '/pages/detail/detail?id=' + e.currentTaret.id
  })
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