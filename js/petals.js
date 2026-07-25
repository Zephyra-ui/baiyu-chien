// ====================== 花瓣飘落动态特效 ======================
/**
 * 功能：在页面顶部生成轻柔飘落的花瓣
 * 特点：随机大小、随机速度、随机左右摇摆、触底自动移除
 */

// 粉紫色发光蔷薇花瓣飘落，匹配你提供的参考画面质感
function createRosePetal() {
  const petal = document.createElement('div');
  petal.classList.add('rose-petal');

  // 随机花瓣颜色，偏蔷薇色系
  const colors = [
    '#e6b8c2',
    '#d8a3a3',
    '#f4c2c2',
    '#c97a8a',
    '#e8d5d5'
  ];
  
  const color = petalColors[Math.floor(Math.random() * petalColors.length)];

  // 随机大小 6 ~ 16px，模拟花瓣大小不一
  const size = Math.random() * 10 + 6;
  // 左右摆动幅度
  const swingRange = (Math.random() - 0.5) * 160;
  // 下落时长 7 ~ 14秒，快慢区分
  const fallTime = Math.random() * 7 + 7;

  petal.style.width = size + 'px';
  petal.style.height = size * 0.75 + 'px';
  petal.style.background = color;
  // 光晕，还原图片发光效果
  petal.style.boxShadow = `0 0 ${size/2}px ${color}`;
  petal.style.left = Math.random() * window.innerWidth + 'px';
  petal.style.setProperty('--swing', swingRange + 'px');
  petal.style.animationDuration = fallTime + 's';

  document.body.appendChild(petal);

  // 动画结束自动销毁，防止DOM堆积
  setTimeout(() => petal.remove(), fallTime * 1000);
}

// 启动花瓣
function startPetalEffect() {
  // 每700ms生成一片，想要更密改成500，更稀疏改成1000
  setInterval(createRosePetal, 700);
}

// 页面加载完成启动
window.addEventListener('load', startPetalEffect);

// 窗口缩放适配
window.addEventListener('resize', () => {});