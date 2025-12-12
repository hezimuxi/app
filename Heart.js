// pages/Heart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:'等待获取token',

  },
    /**
   * 获取token按钮按下:
   */
  touchBtn_gettoken:function()
  {
  console.log("获取 token 按钮按下");
  this.setData({result:'获取 token 按钮按下'});
  this.gettoken();
  },
     /**
   * 获取设备影子按钮按下:
   */
  touchBtn_getshadow:function()
  {
  console.log("获取设备影子按钮按下");
  this.setData({result:'获取设备影子按钮按下'});
  this.getshadow();
  },

  gettoken:function()
{
console.log("开始获取。。。");//打印完整消息
var that=this; 
wx.request({
url: 'https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens ',
data:'{"auth": { "identity": {"methods": ["password"],"password": {"user": {"name": "Utzye","password": "Utzyekb5Z9","domain": {"name": "lushengwei1118"}}}},"scope": {"project": {"name": "cn-north-4"}}}}',
method: 'POST',
header: {'content-type': 'application/json' }, // 请求的 header
success: function(res){// success
// success
console.log("获取 token 成功");//打印完整消息
console.log(res);//打印完整消息
var token='';
token=JSON.stringify(res.header['X-Subject-Token']);//解析消息头 token
token=token.replaceAll("\"", "");
console.log("获取 token=\n"+token);//打印 token
wx.setStorageSync('token',token);
},
fail:function(){
// fail
console.log("获取 token 失败");//打印完整消息
},
complete: function() {
// complete
console.log("获取 token 完成");//打印完整消息
}
});
},

getshadow:function(){ 
  console.log("开始获取影子");//打印完整消息 
  var that=this;  //这个很重要，在下面的回调函数中由于异步问题不能有效修改变量，需要用that获取 
  var token=wx.getStorageSync('token');//读缓存中保存的token 
  console.log("我的token:"+token);//打印完整消息 
  wx.request({ 
      url: 'https://489c919916.st1.iotda-app.cn-north-4.myhuaweicloud.com/v5/iot/69323cf7f69b1239b085218c/devices/69323cf7f69b1239b085218c_Heart_test/shadow', 
//此处的terminal_endpoint是之前提到的终端节点，project_id和device_id分别为产品ID和设备ID 
      data:'', 
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
      header: {'content-type': 'application/json','X-Auth-Token':token }, //请求的header  
      success: function(res){// success 
        // success 
          console.log(res);//打印完整消息 
      }, 
      fail:function(){ 
          // fail 
          console.log("获取影子失败");//打印完整消息 
      }, 
      complete: function() { 
          // complete 
          console.log("获取影子完成");//打印完整消息 
      }  
}); 
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})