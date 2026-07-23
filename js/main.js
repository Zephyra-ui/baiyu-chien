// ========== 单页板块切换 ==========
function switchPage() {
  const hash = window.location.hash.slice(1) || 'home';
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-menu a');

  sections.forEach(sec => sec.classList.remove('active'));
  const targetSection = document.getElementById(hash);
  if (targetSection) {
    targetSection.classList.add('active');
    window.scrollTo(0, 0);
  }

  navLinks.forEach(link => {
    if (link.getAttribute('href') === '#' + hash) {
      link.style.color = '#b89a9a';
    } else {
      link.style.color = '';
    }
  });
}
window.addEventListener('load', switchPage);
window.addEventListener('hashchange', switchPage);

// ========== 背景音乐：纯自定义透明图标 + 播放旋转 ==========
(function () {
  const musicBtn = document.createElement('div');
  musicBtn.className = 'music-float-btn';
  musicBtn.title = '播放背景音乐';

  musicBtn.innerHTML = `
    <img src="./images/music-icon.png" alt="背景音乐">
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
    } else {
      bgMusic.play().catch(() => {});
      musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
  });
})();

// ========== 穿搭画廊 详情弹窗 ==========
const outfitModal = document.getElementById('outfitModal');
const outfitCards = document.querySelectorAll('.outfit-card');

if (outfitCards.length > 0 && outfitModal) {
  const modalClose = document.getElementById('modalClose');

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
      
      outfitModal.style.display = 'flex';
    });
  });

  function closeModal() {
    outfitModal.style.display = 'none';
  }

  modalClose.addEventListener('click', closeModal);
  outfitModal.addEventListener('click', e => {
    if (e.target === outfitModal) closeModal();
  });
}

// ========== 对话互动：预设静态对话 ==========
const chatWindow = document.getElementById('chatWindow');
const topicTags = document.querySelectorAll('.topic-tag');
const chatInput = document.querySelector('.chat-input');
const sendBtn = document.querySelector('.send-btn');

const presetChats = {
  "花房的白蔷薇": [
    { role: "chien", text: "今天的白蔷薇开得比昨天更盛了。" },
    { role: "baiyu", text: "我刚进公爵府就闻到香味了，你又在花房待了一上午？" },
    { role: "chien", text: "……有几枝要修剪，不然会抢养分。" },
    { role: "baiyu", text: "难怪你指尖都沾着花汁。我带了南疆的花肥，据说能让花期再延半个月。" },
    { role: "chien", text: "……放那边桌上吧。谢了。" }
  ],
  "蜂蜜甜点": [
    { role: "baiyu", text: "我惦记了一整年的蜂蜜凉糕，今年厨房还做吗？" },
    { role: "chien", text: "厨房今早刚蒸好，你鼻子倒是灵。" },
    { role: "baiyu", text: "那当然，整个公国就你家厨房做的蜂蜜糕最地道。" },
    { role: "chien", text: "（侧过脸）想吃就去厨房拿，别在这说废话。" },
    { role: "baiyu", text: "哈哈，一起去？我顺便给你讲南边甜点的做法。" }
  ],
  "游历见闻": [
    { role: "baiyu", text: "这次往西走，见了整片的沙漠蔷薇，和你花房的完全不一样。" },
    { role: "chien", text: "沙漠里也能长蔷薇？" },
    { role: "baiyu", text: "能啊，花瓣更厚，颜色也深。我带了种子回来，下次种给你看。" },
    { role: "chien", text: "……嗯，我记着。你还遇到什么了？" },
    { role: "baiyu", text: "遇到了游牧的商队，他们唱的歌调子特别有意思，我哼给你听？" }
  ],
  "军中趣事": [
    { role: "baiyu", text: "听说前几天演武，你把副将都打服了？" },
    { role: "chien", text: "是他自己要领教，输了也正常。" },
    { role: "baiyu", text: "军团里都在传，咱们公爵看着瘦，下手可一点不含糊。" },
    { role: "chien", text: "（皱眉）军中闲话怎么也传到你耳朵里了。" },
    { role: "baiyu", text: "我刚回来就听卫兵说的啊。哎，你的霜薇剑最近还常练吗？" }
  ],
  "春日午后": [
    { role: "chien", text: "阳光这么好，你不出去走走？" },
    { role: "baiyu", text: "在花房里坐着就很好，有花有茶，还有人陪。" },
    { role: "chien", text: "（低头翻书）谁陪你了，我在看花艺谱。" },
    { role: "baiyu", text: "好好好，是我陪着公爵大人。你看你的，我不说话。" },
    { role: "chien", text: "……也不是不能说话。" }
  ]
};

function renderChat(topic) {
  const chatList = presetChats[topic];
  if (!chatList) return;

  chatWindow.innerHTML = '';
  chatList.forEach((msg, index) => {
    setTimeout(() => {
      addMsg(msg.role === 'chien' ? 'left' : 'right', msg.text);
    }, index * 600);
  });
}

function addMsg(type, content) {
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;

  if (type === 'left') {
    div.innerHTML = `
      <div class="msg-avatar pink">🌸</div>
      <div class="msg-bubble pink">${content}</div>
    `;
  } else {
    div.innerHTML = `
      <div class="msg-bubble green">${content}</div>
      <div class="msg-avatar green">📖</div>
    `;
  }

  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

if (topicTags.length > 0) {
  topicTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const topic = tag.textContent.trim();
      renderChat(topic);
    });
  });
}

if (sendBtn && chatInput) {
  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    const matched = Object.keys(presetChats).find(t => 
      t.includes(text) || text.includes(t)
    );

    if (matched) {
      renderChat(matched);
    } else {
      addMsg('system', '暂无该话题的对话，试试下方的快捷话题吧~');
    }
    chatInput.value = '';
  }

  sendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSend();
  });
}

// ========== 日常小剧场 手风琴折叠 ==========
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
// ========== 人物档案详情弹窗 ==========
const characterModal = document.getElementById('characterModal');
const characterCards = document.querySelectorAll('.oc-card');

if (characterCards.length > 0 && characterModal) {
  const charModalClose = document.getElementById('charModalClose');
  const modalContent = characterModal.querySelector('.character-modal-content');

  // 人物完整数据
  const characterData = {
    chien: {
      theme: 'chien-theme',
      banner: 'linear-gradient(135deg, #8b3a4a, #c97a8a)',
      avatar: '🌹',
      tag: '玫瑰公国掌权人',
      name: '池恩',
      title: '玫瑰公国女伯爵 · 家族统帅',
      basic: [
        '种族：纯人类',
        '年龄：20岁',
        '身高：172cm',
        '身份：玫瑰公国世袭女伯爵',
        '特征：粉蓝渐变瞳 · 右眼泪痣 · 及腰棕发'
      ],
      personality: [
        '冷艳端方，行事利落果决，自带掌权者的疏离威严',
        '心思沉稳克制，不轻易表露情绪，对外始终保持距离感',
        '唯独对白屿会卸下防备，展露罕见的温柔与柔软',
        '责任感极强，将公国与家族荣誉视作己任',
        '嘴硬心软，不擅长直白表达心意，习惯用行动代替言语'
      ],
      ability: [
        '精通剑术，身法精准利落，常年训练拥有极强的肢体控制力',
        '熟稔政务与贵族礼仪，行事周全有章法，气场沉稳有压迫感',
        '对玫瑰培育与花艺有独到心得，打理花房是少有的放松方式',
        '观察力敏锐，能轻易洞察局势与人心，处事果决不拖泥带水'
      ],
      quote: '"玫瑰有刺，方能护得自身周全。你若懂它，便知温柔只给意中人。"'
    },
    baiyu: {
      theme: 'baiyu-theme',
      banner: 'linear-gradient(135deg, #e0ebe7, #f7faf9)',
      avatar: '✒️',
      tag: '中州来的符术师',
      name: '白屿',
      title: '中州符术师 · 池恩的专属偏爱',
      basic: [
        '种族：纯人类（先天性白化病）',
        '年龄：19岁',
        '身高：162cm',
        '身份：中州符术师',
        '特征：浅红琉璃瞳 · 雪白短发 · 脑后细发辫'
      ],
      personality: [
        '外在清透易碎，实则鲜活灵动、俏皮有活力，反差感极强',
        '待人亲和有元气，心思细腻通透，唯独偏爱都给了池恩',
        '钻研符术时专注沉稳，指尖稳准利落，专业度极高',
        '天性乐观鲜活，总能融化池恩的冷硬，是对方的软肋',
        '爱撒娇也懂分寸，擅长用软乎乎的方式化解对方的紧绷'
      ],
      ability: [
        '精通中州符术，画符手法精准流畅，指尖控制力极强',
        '通晓中州草药与医理，能调理伤病、养护体质',
        '心灵手巧，擅长编发花艺，总爱给池恩变换发型',
        '行动力强，脚步轻快灵活，遇事反应敏捷不拖沓'
      ],
      quote: '"符笔能画万千阵法，却画不出我看向你时，眼底藏不住的笑意。"'
    }
  };

  // 点击卡片打开弹窗
  characterCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.character;
      const data = characterData[key];
      if (!data) return;

      modalContent.className = 'modal-content character-modal-content ' + data.theme;
      document.getElementById('charBanner').style.background = data.banner;
      document.getElementById('charAvatar').textContent = data.avatar;
      document.getElementById('charTag').textContent = data.tag;
      document.getElementById('charName').textContent = data.name;
      document.getElementById('charTitle').textContent = data.title;
      
      document.getElementById('charBasic').innerHTML = data.basic.map(i => `<li>${i}</li>`).join('');
      document.getElementById('charPersonality').innerHTML = data.personality.map(i => `<li>${i}</li>`).join('');
      document.getElementById('charAbility').innerHTML = data.ability.map(i => `<li>${i}</li>`).join('');
      document.getElementById('charQuote').textContent = data.quote;

      characterModal.style.display = 'flex';
    });
  });

  // 关闭弹窗
  function closeCharModal() {
    characterModal.style.display = 'none';
  }
  charModalClose.addEventListener('click', closeCharModal);
  characterModal.addEventListener('click', e => {
    if (e.target === characterModal) closeCharModal();
  });
}