//初始化数据
const db = wx.cloud.database();
//获取要操纵的集合
const infolist = db.collection('infolist')
//获取查询指令
const _ = db.command

Page({
  data: {
    camptext: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示
    camplist: false, //显示信息列表
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组
    infolist: []
  },


  //清除历史记录
  cleanhistory: function (e) {
    this.setData({
      history: false, //隐藏历史记录
      historyArray: [], //清空历史记录数组
      newArray: [],
      camptext: "" //清空搜索框
    })
  },

  //搜索
  search: function (e) {
    var searchtext = this.data.camptext; //搜索框的值
    var sss = true;
    //如果搜索框的值不是空，将搜索框searchtext的值赋给 历史数组
    if (searchtext != "") {
      this.data.historyArray.push(searchtext);
      //模糊查询1 
      infolist.where({
        title: {
          $regex: '.*' + searchtext
        }
      }).get({
        success: res => {
          this.setData({
            infolist: res.data,
            noneview: res.data.length==0
          });
        }
      });
      this.setData({
        history: false, //隐藏历史记录
        noneview: true, //隐藏未找到提示
        camplist: true, //显示营地列表
        newArray: this.data.historyArray //给新历史记录数组赋值
      })
    } else {
      this.setData({
        noneview: true, //显示未找到提示
        camplist: false, //隐藏营地列表
        history: false, //隐藏历史记录
      })
    }
  },

  getinfolist() {
    infolist.where({
      isShow: true,
    }).get().then(res => {
      this.setData({
        infolist: res.data
      })
    })
  },
  goinfo() {
    wx.navigateTo({
      url: '../home/camp/camp',
    })
  },

  //绑定的输入事件，   搜索框的值
  searchinput: function (e) {
    //当删除input的值为空时
    if (e.detail.value == "") {
      this.setData({
        history: true, //显示历史记录
        camplist: false, //隐藏营地列表
      });

      //所有商品列表的状态改为0
      for (var index in this.data.infoarray) {
        let temp = 'infoarray[' + index + '].status';
        this.setData({
          [temp]: 0,
        })
      }
    }
    this.setData({
      camptext: e.detail.value
    })
  },

  //点击历史记录赋值给搜索框
  textfz: function (e) {
    this.setData({
      camptext: e.target.dataset.text
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getinfolist()
  }
})