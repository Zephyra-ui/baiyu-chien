// ====================== 花瓣飘落动态特效 ======================
/**
 * 功能：在页面顶部生成轻柔飘落的花瓣
 * 特点：随机大小、随机速度、随机左右摇摆、触底自动移除
 */

function createPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';

  // 随机花瓣颜色，偏蔷薇色系
  const colors = [
    '#e6b8c2',
    '#d8a3a3',
    '#f4c2c2',
    '#c97a8a',
    '#e8d5d5'
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  // 随机大小
  const size = Math.random() * 12 + 8;

  // 初始位置：屏幕顶部随机水平位置
  const startX = Math.random() * window.innerWidth;

  // 随机下落速度
  const fallDuration = Math.random() * 8 + 6;

  // 随机左右摇摆幅度
  const swayAmount = Math.random() * 100 + 50;

  petal.style.width = size + 'px';
  petal.style.height = size + 'px';
  petal.style.left = startX + 'px';
  petal.style.top = '-20px';
  petal.style.background = randomColor;
  petal.style.animationDuration = fallDuration + 's';
  petal.style.setProperty('--sway', swayAmount + 'px');

  document.body.appendChild(petal);

  // 动画结束后移除，避免元素越来越多
  setTimeout(() => {
    petal.remove();
  }, fallDuration * 1000);
}

// 定时生成花瓣
function startPetalFall() {
  setInterval(() => {
    createPetal();
  }, 800); // 每800ms生成一片，可调整密度
}

// 页面加载完成后启动
window.addEventListener('load', startPetalFall);