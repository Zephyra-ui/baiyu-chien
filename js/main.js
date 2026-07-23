// ========== 1. OC Tab切换功能 ==========
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length > 0) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const tabContainer = btn.closest('.oc-tabs');
      const allTabs = tabContainer.querySelectorAll('.tab-btn');
      const allPanels = document.querySelectorAll('.oc-panel, .gallery-grid');
      
      allTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      allPanels.forEach(panel => panel.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');
    });
  });
}

// ========== 2. 全局背景音乐悬浮按钮（实心蔷薇花版） ==========
(function() {
  const musicBtn = document.createElement('div');
  musicBtn.className = 'music-float-btn';
  musicBtn.title = '播放背景音乐';

  musicBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.5c-1.2 0-2.3.6-3 1.5-.7-.9-1.8-1.5-3-1.5A3.5 3.5 0 0 0 2.5 6c0 1.3.7 2.4 1.7 3A3.5 3.5 0 0 0 3 12a3.5 3.5 0 0 0 1.2 2.8c-.6.7-1 1.6-1 2.7A3.5 3.5 0 0 0 6.7 21c1.1 0 2-.4 2.7-1 .8.6 1.8 1 2.8 1s2-.4 2.8-1c.7.6 1.6 1 2.7 1a3.5 3.5 0 0 0 3.5-3.5c0-1.1-.4-2-1-2.7A3.5 3.5 0 0 0 21 12a3.5 3.5 0 0 0-1.2-2.8c1-.6 1.7-1.7 1.7-3A3.5 3.5 0 0 0 18 2.5c-1.2 0-2.3.6-3 1.5-.7-.9-1.8-1.5-3-1.5z"/>
      <circle cx="12" cy="12" r="2" fill="#fff" opacity="0.8"/>
    </svg>
    <audio id="bgMusic" loop preload="auto">
      <source src="./music/bgm.mp3" type="audio/mpeg">
    
  `;

  document.body.appendChild(musicBtn);

  const bgMusic = document.getElementById('bgMusic');
  let isPlaying = false;

  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      musicBtn.classList.remove('playing');
      musicBtn.title = '播放背景音乐';
    } else {
      bgMusic.play().catch(err => {
        console.warn('音乐播放失败：', err);
        alert('音频加载失败，请检查 music 文件夹里是否有 bgm.mp3 文件');
      });
      musicBtn.classList.add('playing');
      musicBtn.title = '暂停背景音乐';
    }
    isPlaying = !isPlaying;
  });
})();

// ========== 3. 穿搭画廊 详情弹窗 ==========
const outfitModal = document.getElementById('outfitModal');
const outfitCards = document.querySelectorAll('.outfit-card');

if (outfitCards.length > 0 && outfitModal) {
  const modalClose = document.getElementById('modalClose');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  const outfitData = {
    formal: {
      tag: '正式场合',
      title: '公爵正礼服',
      subtitle: '端庄 · 优雅 · 公爵威仪',
      desc: '世袭公爵的正式礼服，银白蔷薇暗纹绣于裙身，深绯色外披庄重典雅，是朝会与国宴时的装束。',
      details: [
        '银白蔷薇暗纹长裙，腰线处缀珍珠蔷薇扣',
        '深绯色丝绒外披，内衬银灰绸缎',
        '银质蔷薇花冠发饰，垂落细碎珍珠链',
        '裙摆长及地面，行走时如蔷薇花瓣缓缓展开'
      ],
      img: './images/chien-formal.jpg'
    },
    armor: {
      tag: '军务装束',
      title: '军团统帅服',
      subtitle: '利落 · 冷峻 · 军人风骨',
      desc: '银蔷薇军团统帅专属甲胄，轻铠便于行军作战，披风绣银蔷薇纹章，是演武与出征时的装束。',
      details: [
        '银灰轻质钢铠，关节处做蔷薇雕花',
        '深绯色绒面披风，内衬银白绸缎',
        '腰间佩剑「霜薇」，剑格为蔷薇造型',
        '高束发冠，利落无多余装饰'
      ],
      img: './images/chien-armor.jpg'
    },
    daily: {
      tag: '花房日常',
      title: '花房便服',
      subtitle: '闲适 · 柔和 · 少女本色',
      desc: '在花房打理花草时的便服，面料柔软透气，方便活动，是池恩最放松状态下的穿搭。',
      details: [
        '米白棉麻衬衫，袖口可挽起',
        '豆绿亚麻围裙，耐脏且柔和',
        '棕色牛皮手套，修剪花枝时佩戴',
        '软底布靴，行走时悄无声息'
      ],
      img: './images/chien-daily.jpg'
    },
    walk: {
      tag: '外出便服',
      title: '漫步常服',
      subtitle: '清新 · 温婉 · 市井闲步',
      desc: '微服出街时的寻常装束，色调柔和不显眼，便于融入街市人群。',
      details: [
        '米白色棉麻长裙，垂感柔和',
        '橄榄绿针织开衫，春秋皆宜',
        '草编宽檐帽，遮挡日光',
        '藤编小挎包，装手帕与零钱'
      ],
      img: './images/chien-walk.jpg'
    }
  };

  outfitCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.outfit;
      const data = outfitData[key];
      if (!data) return;

      document.getElementById('modalTag').textContent = data.tag;
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalSubtitle').textContent = data.subtitle;
      document.getElementById('modalDesc').textContent = data.desc;
      document.getElementById('modalImg').src = data.img;
      
      const detailList = document.getElementById('modalDetails');
      detailList.innerHTML = data.details.map(item => `<li>${item}</li>`).join('');
      
      outfitModal.classList.add('show');
    });
  });

  function closeModal() {
    outfitModal.classList.remove('show');
  }

  modalClose.addEventListener('click', closeModal);
  modalCloseBtn.addEventListener('click', closeModal);
  outfitModal.addEventListener('click', e => {
    if (e.target === outfitModal) closeModal();
  });
}

// ========== 4. 日常小剧场 手风琴折叠 ==========
const storyItems = document.querySelectorAll('.story-item');
if (storyItems.length > 0) {
  storyItems.forEach(item => {
    const header = item.querySelector('.story-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      storyItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}