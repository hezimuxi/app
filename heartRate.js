Page({
  data: {
    result: '请点击“测心率”按钮',
    heartRate: null,
    pressing: false
  },

  // 按钮视觉反馈
  onBtnDown() {
    this.setData({ pressing: true });
  },
  onBtnUp() {
    this.setData({ pressing: false });
  },

  // “测心率”主流程
  onMeasureHeartRate() {
    this.setData({
      result: '正在请求心率，请稍候...',
      heartRate: null,
      pressing: false
    });
    this.getTokenAndShadow();
  },

  // 依次获取token和影子
  getTokenAndShadow() {
    var that = this;
    wx.request({
      url: 'https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens',
      data: '{"auth": {"identity": {"methods": ["password"],"password": {"user": {"name": "Utzye","password": "Utzyekb5Z9","domain": {"name": "lushengwei1118"}}}},"scope": {"project": {"name": "cn-north-4"}}}}',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var token = res.header['X-Subject-Token'];
        wx.request({
          url: 'https://489c919916.st1.iotda-app.cn-north-4.myhuaweicloud.com/v5/iot/69323cf7f69b1239b085218c/devices/69323cf7f69b1239b085218c_Heart_test/shadow',
          method: 'GET',
          data: '',
          header: { 'content-type': 'application/json', 'X-Auth-Token': token },
          success: function (res2) {
            let hr = null;
            try {
              const shadow = res2.data.shadow || [];
              if (shadow.length > 0) {
                hr = shadow[0].reported.properties.HeartRateMonitor;
              }
            } catch (e) {}
            // 判断是否触发报警
            if (hr === 70) {
              that.setData({
                result: '心率异常',
                heartRate: hr
              });
              that.playBuzzNTimes(5);
            } else {
              that.setData({
                result: hr !== null ? '心率获取成功' : '未获得心率数据',
                heartRate: hr
              });
            }
          },
          fail: function () {
            that.setData({ result: '获取设备影子失败', heartRate: null });
          }
        });
      },
      fail: function () {
        that.setData({ result: '获取TOKEN失败', heartRate: null });
      }
    });
  },

  // 连续播放 buzz.mp3 n 次
  playBuzzNTimes(n) {
    let playCount = 0;
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = '/music/buzz.mp3';
    innerAudioContext.onEnded(() => {
      playCount++;
      if (playCount < n) {
        innerAudioContext.play();
      } else {
        innerAudioContext.destroy();
      }
    });
    // 需手动开始第一次播放
    innerAudioContext.play();
  }
});