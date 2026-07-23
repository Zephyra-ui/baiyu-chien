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
      banner: 'linear-gradient(135deg, #b89a9a, #d6c4c4)',
      avatar: '🌸',
      tag: '银蔷薇军团统帅',
      name: '池恩',
      title: '希恩公爵 · 军团最高统帅',
      basic: [
        '种族：人类',
        '年龄：22岁',
        '身高：172cm',
        '生日：6月15日',
        '身份：希恩公国世袭公爵'
      ],
      personality: [
        '外表清冷寡言，不擅长表露情绪',
        '内心柔软细腻，对在意的人会默默付出',
        '责任感极强，将公国与军团视作己任',
        '容易耳尖发红，典型的口是心非',
        '面对调侃会故作镇定，实则很容易害羞'
      ],
      ability: [
        '剑术高超，一手霜薇剑法人尽皆知',
        '精通军事指挥，擅长以少胜多的战术',
        '擅长园艺，尤其精通蔷薇的栽培与养护',
        '观察力敏锐，能轻易看穿他人的谎言',
        '厨艺意外地不错，只做给自己和亲近的人'
      ],
      quote: '"我会守护好这片土地，和这里的蔷薇。不需要你的同情，我自己能行。"'
    },
    baiyu: {
      theme: 'baiyu-theme',
      banner: 'linear-gradient(135deg, #8aa899, #c4d4cb)',
      avatar: '📖',
      tag: '游历四方的学者',
      name: '白屿',
      title: '游学者 · 池恩的毕生挚友',
      basic: [
        '种族：人类',
        '年龄：24岁',
        '身高：183cm',
        '生日：9月12日',
        '身份：自由游历的青年学者'
      ],
      personality: [
        '温和健谈，待人接物从容通透',
        '爱笑，喜欢调侃池恩，分寸感极好',
        '见多识广，对各地风土人情如数家珍',
        '心思细腻，总能看穿池恩的口是心非',
        '看似随性散漫，实则非常重情重义'
      ],
      ability: [
        '博学多识，通晓历史、地理、草药等多门学问',
        '精通医术与草药辨识，能处理常见伤病',
        '口才极佳，擅长化解尴尬与谈判斡旋',
        '厨艺精湛，会做各地的特色点心',
        '身手不凡，但极少出手，习惯以理服人'
      ],
      quote: '"走遍万水千山，最想念的还是公爵府的花房。你嘴硬的样子，比蔷薇花还好看。"'
    }
  };

  // 点击卡片打开弹窗
  characterCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.character;
      const data = characterData[key];
      if (!data) return;

      // 切换主题色
      modalContent.className = 'modal-content character-modal-content ' + data.theme;
      // 填充内容
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