// miniprogram/pages/publish/publish.js
//初始化数据
const db = wx.cloud.database();
//获取要操纵的集合
const publishlist = db.collection('publishlist')
// 获取时间
var util = require('../../utils/util.js')

Page({
  data: {
    addImgOne: '/images1/publish.png', //要添加的图片一的路径
    addImgTwo: '/images1/publish.png',
    addImgThree: '/images1/publish.png',

    activeTwo: false, //第二个添加图片图标是否显示
    activeThree: false,

    time: "",
    inpVal: '',
    title: '',
    addr: '',
    tel: '',

    fileLoadOne: '', //第一张图片的云端路径
    fileLoadTwo: false,
    fileLoadThree: false,

    threeClose: false, //关闭按钮
    oneClose: false,
    twoClose: false,

    selLoadOne: "", //文件暂存路径
    selLoadTwo: "",
    selLoadThree: "",

    uploading: '/images1/uploading.png', //加载的图片
    isShare: false,
    imgNum: 0,

    chooseFacilityList: [],
    checks: [{
        name: "WC",
        value: '0',
        checked: false,
        url1: '/images2/toilet.png',
        url2: '/images2/toiletno.png'
      },
      {
        name: "充电",
        value: '1',
        checked: false,
        url1: '/images2/charge.png',
        url2: '/images2/chargeno.png'
      },
      {
        name: "帐篷",
        value: '2',
        checked: false,
        url1: '/images2/tent.png',
        url2: '/images2/tentno.png'
      },
      {
        name: "供水",
        value: '3',
        checked: false,
        url1: '/images2/water.png',
        url2: '/images2/waterno.png'
      },
      {
        name: "做饭",
        value: '4',
        url1: '/images2/cook.png',
        url2: '/images2/cookno.png'
      },
      {
        name: "购物",
        value: '5',
        checked: false,
        url1: '/images2/shopping.png',
        url2: '/images2/shoppingno.png'
      },
      {
        name: "运动",
        value: '6',
        checked: false,
        url1: '/images2/sport.png',
        url2: '/images2/sportno.png'
      },
      {
        name: "污水",
        value: '7',
        checked: false,
        url1: '/images2/treatement.png',
        url2: '/images2/treatementno.png'
      },
    ],

  },
  // 选择营地开始
  clicks: function (e) {
    let item = e.currentTarget.dataset.item;
    let facilityName = item.name;
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.checks;
    if (arrs[index].checked == false) {
      arrs[index].checked = true;
      this.data.chooseFacilityList.push(facilityName);
    } else {
      arrs[index].checked = false;
      let chooseIndex = this.data.chooseFacilityList.indexOf(facilityName)

      this.data.chooseFacilityList.splice(chooseIndex, 1);
    }
    console.log(this.data.chooseFacilityList);
    // if(!this.data.chooseFacilityList.includes(facilityName)){
    //   this.data.chooseFacilityList.push(facilityName);
    //   console.log(this.data.chooseFacilityList);
    // }
   
    this.setData({
      checks: arrs
    })
  },
  // 选择营地结束

  upLoadImg(fileName,num) {
    let fName = fileName.replace(/.+\./, '')
    // 第一张图片
    wx.cloud.uploadFile({ //上传至云端的路径(文件夹名＋文件名＋文件后缀】
      cloudPath: 'mini1/' + num + this.data.time + '.' + fName,
      //上传的文件路径
      filePath:fileName,
      timeout: 20000,
      success: (res) => {
        console.log("haha")

        if (num == "a") {
          this.setData({
            fileLoadOne: 'cloud://cloud1-1g0683vye29ecd9b.636c-cloud1-1g0683vye29ecd9b-1305369412/mini1/' + num + this.data.time + '.' + fName,
            addImgOne:fileName,
            oneClose: true,
            imgNum: this.data.imgNum - 1
          })
          console.log("第一个" + this.data.fileLoadOne)
          console.log(this.data.imgNum)
        } else if (num == "b") {
          this.setData({
            fileLoadTwo: 'cloud://cloud1-1g0683vye29ecd9b.636c-cloud1-1g0683vye29ecd9b-1305369412/mini1/' + num + this.data.time + '.' + fName,
            addImgTwo:fileName,
            twoClose: true,
            imgNum: this.data.imgNum - 1
          })
          console.log("第二个" + this.data.fileLoadTwo)
        } else if (num == "c") {
          this.setData({
            fileLoadThree: 'cloud://cloud1-1g0683vye29ecd9b.636c-cloud1-1g0683vye29ecd9b-1305369412/mini1/' + num + this.data.time + '.' + fName,
            addImgThree:fileName,
            threeClose: true,
            imgNum: this.data.imgNum - 1
          })
          console.log("第三个" + this.data.fileLoadThree)
        }
      },
    })
  },
  haha() {
    console.log("haha")
  },
  // 第一个图片添加的函数
  selectimgOne() {

    wx.chooseImage({
      count: 3,
      success: (res) => {
        // console.log(res)
        // 判断点第一个加号上传了几张图片
        if (res.tempFilePaths.length == 1) {
          this.setData({
            addImgOne: this.data.uploading, //上传图片先显示上传中
            activeTwo: true,
            selLoadOne: res.tempFilePaths[0], //保存暂存路径，用于选择图片时删除
            imgNum: this.data.imgNum + 1 //看图片是否全部上传完成
          })
          // console.log(this.data.imgNum)
          this.upLoadImg()
        } else if (res.tempFilePaths.length == 2) {
          this.upLoadImg(res.tempFilePaths[0], "a")
          this.upLoadImg(res.tempFilePaths[1], "b")
          this.setData({
            addImgOne: this.data.uploading,
            activeTwo: true,
            addImgTwo: this.data.uploading,
            activeThree: true,
            selLoadOne: res.tempFilePaths[0], //保存暂存路径，用于选择图片时删除
            selLoadTwo: res.tempFilePaths[1],
            imgNum: this.data.imgNum + 2
          })
        } else {
          this.upLoadImg(res.tempFilePaths[0], "a")
          this.upLoadImg(res.tempFilePaths[1], "b")
          this.upLoadImg(res.tempFilePaths[2], "c")
          this.setData({
            addImgOne: this.data.uploading,
            activeTwo: true,
            addImgTwo: this.data.uploading,
            activeThree: true,
            addImgThree: this.data.uploading,
            thirdClose: true,
            selLoadOne: res.tempFilePaths[0],
            selLoadTwo: res.tempFilePaths[1],
            selLoadThree: res.tempFilePaths[2],
            imgNum: this.data.imgNum + 3
          })
        }
      }
    })
  },

  // 第二个图片添加的函数
  selectimgTwo() {
    wx.chooseImage({
      count: 2,
      success: (res) => {
        //判断点第二个加号上传了几张图片
        if (res.tempFilePaths.length == 1) {
          this.upLoadImg(res.tempFilePaths[0], "b")
          this.setData({
            addImgTwo: this.data.uploading,
            activeThree: true,
            selLoadTwo: res.tempFilePaths[0],
            imgNum: this.data.imgNum + 1
          })
        } else {
          // 调用上传图片函数，将图片上传到云端
          this.upLoadImg(res.tempFilePaths[0], "b")
          this.upLoadImg(res.tempFilePaths[1], "c")
          this.setData({
            addImgTwo: this.data.uploading,
            activeThree: true,
            addImgThree: this.data.uploading,
            selLoadTwo: res.tempFilePaths[0],
            selLoadThree: res.tempFilePaths[1],
            imgNum: this.data.imgNum + 2
          })
        }
      }
    })
  },

  // 第三个图片添加的函数
  selectimgThree() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.upLoadImg(res.tempFilePaths[0], "c")
        this.setData({
          addImgThree: this.data.uploading,
          thirdClose: true,
          selLoadThree: res.tempFilePaths[0],
          imgNum: this.data.imgNum + 1
        })
      }
    })
  },

  //删除选择的第一张图片
  deleteOne() {
    if (this.data.addImgTwo == '../../images/add.png' && this.data.activeTwo) { //当只选择了一个图片的时候
      this.setData({
        activeTwo: false,
        addImgOne: '../../images/add.png',
        fileLoadOne: "",
        oneClose: false,
      })
    } else if (this.data.addImgThree == '../../images/add.png' && this.data.activeThree) {
      this.setData({
        activeThree: false,
        addImgTwo: '../../images/add.png',
        addImgOne: this.data.fileLoadTwo,
        fileLoadOne: this.data.fileLoadTwo,
        fileLoadTwo: "",
        twoClose: false,
      })
    } else if (this.data.addImgThree != '../../images/add.png') {

      this.setData({
        addImgThree: '../../images/add.png',
        addImgOne: this.data.fileLoadTwo,
        fileLoadOne: this.data.fileLoadTwo,
        addImgTwo: this.data.fileLoadThree,
        fileLoadTwo: this.data.fileLoadThree,
        fileLoadThree: "",
        threeClose: false,
      })
    }
  },

  deleteTwo() { //删除选择的第二个图片
    if (this.data.addImgThree == '../../images/add.png' && this.data.activeThree) {
      this.setData({
        activeThree: false,
        addImgTwo: '../../images/add.png',
        fileLoadTwo: "",
        twoClose: false,
      })
    } else if (this.data.addImgThree != '../../images/add.png') {
      this.setData({
        addImgThree: '../../images/add.png',
        addImgTwo: this.data.fileLoadThree,
        fileLoadTwo: this.data.fileLoadThree,
        fileLoadThree: "",
        threeClose: false,
      })
    }
  },

  deleteThree() {
    if (this.data.addImgThree != '../../images/add.png') {
      this.setData({
        addImgThree: '../../images/add.png',
        fileLoadThree: "",
        threeClose: false,
      })
    }
  },


  // 获取输入的值
  getVal(e) {
    this.setData({
      inpVal: e.detail.value
    })
  },
  title1(e) {
    this.setData({
      title: e.detail.value
    })
  },
  addr1(e) {
    this.setData({
      addr: e.detail.value
    })
  },
  tel1(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  publish() {
    publishlist.add({
      data: {
        content: this.data.inpVal,
        title: this.data.title,
        title: this.data.title,
        tel: this.data.tel,
        img1: this.data.selLoadOne,
        img2: this.data.selLoadTwo,
        img3: this.data.selLoadThree,
        checked: this.data.chooseFacilityList,
        isShow: true
      }
    }).then(res => {
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
    }).catch(err => {
      wx.showToast({
        title: '添加失败',
        icon: 'error',
        duration: 2000
      })
      // console.log(err);
    })
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/home/index/index',
      })
    }, 1000)
  },
  // 左上角跳转
  goindex() {
    wx.switchTab({
      url: '/pages/home/index/index',
    })
  },

  onChooseFacility(item) {
    this.data.chooseFacilityList.push(checks);
    console.log(this.data.chooseFacilityList);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取时间
    var timeNow = util.formatTime(new Date());
    this.setData({
      // activeTwo:false,
      // activeThree:false,
      time: timeNow,
    });
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
    wx.navigateTo({
      url: '../home/index/index',
    })
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