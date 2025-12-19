Page({
  data: {
    snake: [{ x: 5, y: 5 }],
    direction: 'right',
    food: null,
    gridSize: 20,
    canvasWidth: 300,
    canvasHeight: 300,
    intervalId: null,
    score: 0,
    isGameOver: false,
    finalScore: 0,
  },

  onLoad() {
    this.ctx = wx.createCanvasContext('snakeCanvas');
    this.startGame();
  },

  startGame: function () {
    const { gridSize } = this.data;

    this.setData({
      snake: [{ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) }],
      direction: 'right',
      score: 0,
      isGameOver: false,
    });

    this.generateFood();

    const intervalId = setInterval(() => {
      this.updateGame();
      this.drawGame();
    }, 300);

    this.setData({ intervalId });
  },

  generateFood: function () {
    const { gridSize, snake } = this.data;
    let foodPosition;
    let isPositionValid = false;

    while (!isPositionValid) {
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * gridSize);

      foodPosition = { x, y };
      isPositionValid =
        x >= 0 && x < gridSize &&
        y >= 0 && y < gridSize &&
        !snake.some(segment => segment.x === x && segment.y === y);
    }

    this.setData({ food: foodPosition });
    console.log("生成新食物位置：", foodPosition);
  },

  updateGame: function () {
    const { snake, direction, food, gridSize, score } = this.data;
    const head = { ...snake[0] };

    if (direction === 'up') head.y -= 1;
    if (direction === 'down') head.y += 1;
    if (direction === 'left') head.x -= 1;
    if (direction === 'right') head.x += 1;

    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      clearInterval(this.data.intervalId);
      wx.showToast({ title: '游戏结束', icon: 'none' });
      this.setData({
        isGameOver: true,
        finalScore: score,
      });
      return;
    }

    if (head.x === food.x && head.y === food.y) {
      snake.unshift(head);
      this.generateFood();
      this.setData({ score: score + 1 });
    } else {
      snake.pop();
      snake.unshift(head);
    }

    this.setData({ snake });
  },

  drawGame: function () {
    const { snake, food, gridSize } = this.data;
    this.ctx.clearRect(0, 0, 300, 300);

    this.ctx.setFillStyle('#57ad68');
    snake.forEach(segment => {
      if (segment.x >= 0 && segment.x < gridSize && segment.y >= 0 && segment.y < gridSize) {
        this.ctx.fillRect(segment.x * 15, segment.y * 15, 15, 15);
      }
    });

    if (food && food.x >= 0 && food.x < gridSize && food.y >= 0 && food.y < gridSize) {
      this.ctx.setFillStyle('#ff0000');
      this.ctx.fillRect(food.x * 15, food.y * 15, 15, 15);
    }

    this.ctx.draw();
  },

  moveUp: function () {
    if (this.data.direction !== 'down') this.setData({ direction: 'up' });
  },

  moveDown: function () {
    if (this.data.direction !== 'up') this.setData({ direction: 'down' });
  },

  moveLeft: function () {
    if (this.data.direction !== 'right') this.setData({ direction: 'left' });
  },

  moveRight: function () {
    if (this.data.direction !== 'left') this.setData({ direction: 'right' });
  },

  restartGame: function () {
    clearInterval(this.data.intervalId);

    this.setData({
      snake: [{ x: 5, y: 5 }],
      direction: 'right',
      food: null,
      score: 0,
      isGameOver: false,
    });

    this.startGame();
  },

  onUnload: function () {
    clearInterval(this.data.intervalId);
  },
});