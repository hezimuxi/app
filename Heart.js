Page({

  // 页面的初始数据
  data: {
    result: '请点击获取TOKEN', // 初始提示信息
  },

  // 获取 token 按钮按下
  touchBtn_gettoken: function () {
    console.log("获取 TOKEN 按钮按下");
    this.setData({ result: '获取TOKEN中...' }); // 更新提示信息为"获取TOKEN中"
    this.gettoken();
  },

  // 获取设备影子按钮按下
  touchBtn_getshadow: function () {
    console.log("获取设备影子按钮按下");
    this.setData({ result: '获取设备影子中...' }); // 更新提示信息为"获取设备影子中"
    this.getshadow();
  },
  navigateToHeartRate: function() {
    wx.navigateTo({
      url: '/pages/heartRate'
    })
  },
  // 获取 TOKEN 逻辑
  gettoken: function () {
    console.log("开始获取TOKEN...");//打印完整消息
    var that = this; 
    wx.request({
      url: 'https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens',
      data: '{"auth": {"identity": {"methods": ["password"],"password": {"user": {"name": "Utzye","password": "Utzyekb5Z9","domain": {"name": "lushengwei1118"}}}},"scope": {"project": {"name": "cn-north-4"}}}}',
      method: 'POST',
      header: { 'content-type': 'application/json' }, // 请求的 header
      success: function (res) {
        console.log("获取 TOKEN 成功"); // 打印完整消息
        console.log(res); // 打印完整消息
        var token = JSON.stringify(res.header['X-Subject-Token']); // 解析消息头 token
        token = token.replaceAll("\"", "");
        console.log("获取 TOKEN=\n" + token); // 打印 token
        wx.setStorageSync('token', token); // 存储 token
        that.setData({ result: '获取TOKEN成功' }); // 更新提示信息为"获取TOKEN成功"
      },
      fail: function () {
        console.log("获取 TOKEN 失败"); // 打印完整消息
        that.setData({ result: '获取TOKEN失败' }); // 更新提示信息为"获取TOKEN失败"
      },
      complete: function () {
        console.log("获取 TOKEN 完成"); // 打印完整消息
      }
    });
  },

  // 获取设备影子逻辑
  getshadow: function () {
    console.log("开始获取设备影子..."); //打印完整消息
    var that = this;  
    var token = wx.getStorageSync('token'); // 获取缓存的 token
    console.log("我的TOKEN:" + token); //打印完整消息
    wx.request({
      url: 'https://489c919916.st1.iotda-app.cn-north-4.myhuaweicloud.com/v5/iot/69323cf7f69b1239b085218c/devices/69323cf7f69b1239b085218c_Heart_test/shadow',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
      data: '',
      header: { 'content-type': 'application/json', 'X-Auth-Token': token }, // 请求的 header  
      success: function (res) {
        console.log(res); // 打印完整消息
        that.setData({ result: '获取设备影子成功' }); // 更新提示信息为"获取设备影子成功"
      },
      fail: function () {
        console.log("获取设备影子失败"); // 打印完整消息
        that.setData({ result: '获取设备影子失败' }); // 更新提示信息为"获取设备影子失败"
      },
      complete: function () {
        console.log("获取设备影子完成"); // 打印完整消息
      }
    });
  },

  // 跳转到贪吃蛇小游戏界面
  navigateToGame: function () {
    wx.navigateTo({
      url: '/pages/snakeGame', // 跳转到贪吃蛇页面
    });
  },

  navigateToJokes: function () {
    wx.navigateTo({
      url: '/pages/coldJokes' // 跳转到冷笑话页面
    });
  },

  // 生命周期函数--监听页面加载
  onLoad(options) { },

  // 生命周期函数--页面初次渲染完成
  onReady() { },

  // 生命周期函数--页面显示
  onShow() { },

  // 生命周期函数--页面隐藏
  onHide() { },

  // 生命周期函数--页面卸载
  onUnload() { },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() { },

  // 页面上拉触底事件的处理函数
  onReachBottom() { },

  // 用户点击右上角分享
  onShareAppMessage() { }
});