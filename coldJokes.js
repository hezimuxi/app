Page({
  data: {
    jokes: [
      { question: "打麻将四缺一，打电话叫小明为什么小明不去？", answer: "因为小明是0。" },
      { question: "什么东西是红色的 并且闻起来像蓝色油漆？", answer: "红色油漆。" },
      { question: "奥特曼，打一明星？", answer: "奥特曼赢了。" },
      { question: "玉米和什么一起吃会中毒？", answer: "毒药。" },
      { question: "西红柿在日本叫什么？", answer: "番茄酱。" },
      { question: "看来只好拿出我压箱底的冷笑话了。", answer: "但我没带钥匙。" },
      { question: "带小猫出去玩，叫遛猫，带小狗出去玩，叫遛狗，带小孩出去玩，叫什么？", answer: "六小龄童。" },
      { question: "有一天我的脚好酸，为什么？", answer: "因为我踩到了柠檬。" },
      { question: "女娲用什么补天？", answer: "强扭的瓜。" },
      { question: "苏轼喜欢吃什么肉？", answer: "牛肉，因为他专门写了赤壁赋（beef）。" },
      { question: "为什么纪晓岚喜欢穿宽宽大大的农服？", answer: "因为他讨厌和珅（合身）。" },
      { question: "我有两只大象，怎么区分哪只是真的哪只是假的？", answer: "扔进水里，因为真象自会浮出水面。" },
      { question: "A和C谁高？", answer: "C高，因为ABCD（A比C低）" }
    ],
    currentJoke: {},
    showingAnswer: false
  },

  onLoad() {
    this.refreshJoke();
  },

  // 刷新冷笑话
  refreshJoke() {
    const randomIndex = Math.floor(Math.random() * this.data.jokes.length);
    this.setData({
      currentJoke: this.data.jokes[randomIndex],
      showingAnswer: false
    });
  },

  // 显示答案并播放罐头笑声
  showAnswer() {
    this.setData({
      showingAnswer: true
    });
    // 播放罐头笑声
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = 'music/canlaugh.mp3'; // 修改为本地路径
    innerAudioContext.play();

    // （可选）自动销毁，避免多次引用浪费资源
    innerAudioContext.onEnded(() => {
      innerAudioContext.destroy();
    });
  }
});