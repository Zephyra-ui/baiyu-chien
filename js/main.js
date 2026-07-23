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
  const modalContent = outfitModal.querySelector('.outfit-modal-content');

  // 完整服设数据
  const outfitData = {
    // ===== 池恩五套 =====
    "chien-feishu": {
      theme: "chien-theme",
      tag: "公务常服",
      title: "绯枢 · 议政官装",
      subtitle: "室内核心公务 · 出场率最高",
      scenes: "日常议政批阅、接见臣属、庄园议事、常规贵族会晤等正式办公场景，平衡贵族庄重感与军人利落感。",
      version: "立领中长款收腰上衣+高腰直筒长裤，整体利落直线条。上衣长度至大腿中部，腰部精准收腰，下摆两侧开叉；长裤高腰直筒，裤脚收进靴筒，垂坠感强，久坐不易起皱。",
      fabric: "主色哑光酒红，墨黑厚缎窄边镶边，红黑配比约7:3。含羊毛厚缎底布，暗织同色系蔷薇提花，挺括抗皱、垂坠感佳。",
      details: [
        "左胸固定哑光蔷薇金家族徽章，室内光线下不反光晃眼",
        "可调节束口袖口，内侧暗扣设计，处理公文时可收紧至小臂",
        "腰侧左右隐形暗袋，分别存放印章、便签与火漆、随身小刀",
        "门襟内侧绣细小金色蔷薇枝蔓，仅近身可见的私密精致细节"
      ],
      match: [
        "鞋履：黑色3cm低跟牛皮正装靴，靴面压暗纹蔷薇",
        "配饰：小巧蔷薇金耳钉 + 墨黑宽版牛皮腰带 + 家族佩剑",
        "随身：胸口内侧口袋揣家族制式钢笔与空白便签"
      ],
      egg: "日常为自然披发，伏案久了发丝垂落碍事，白屿路过书房时总会随手拢起她两侧发丝，挽成松松的半扎发用素银蔷薇簪固定。池恩通常头都不抬，任由他摆弄，顶着半扎发继续批阅公文。",
      img: "./images/chien-feishu.jpg"
    },
    "chien-jirong": {
      theme: "chien-theme",
      tag: "军事装束",
      title: "棘戎 · 戎装劲服",
      subtitle: "演武练兵 · 出征巡察",
      scenes: "军队演练、演武比剑、出征巡察、边境驻防、实战训练等高强度场景，极致利落无赘饰，实用性优先。",
      version: "短款收腰立领戎装上衣+高弹紧身军裤+中筒军靴，修身战斗廓形。短款设计最大化提升活动度，肩部拼接薄牛皮护肩；军裤高腰紧身，裤侧加固缝线；腰部叠搭双层武装带。",
      fabric: "主色哑光墨黑，肩线裤缝压酒红明线勾勒，黑红配比约9:1。耐磨帆布拼接哑光牛皮，肘膝部位加厚，防风防刮，经过拒水处理，轻微淋雨不会立刻渗透。",
      details: [
        "左臂缝蔷薇公国制式军徽布标，耐磨处理不易脱线褪色",
        "魔术贴绑带袖口，可完全收紧避免挥剑时衣袖晃动干扰",
        "胸口、腰侧、大腿外侧多处隐形暗袋，存放止血药、火石等应急物品",
        "下摆与腰侧多枚加固金属挂袢，可固定披风、水壶、剑鞘等装备"
      ],
      match: [
        "鞋履：黑色牛皮中筒军靴，2cm防滑橡胶底，靴口收紧防沙石",
        "配饰：最小号蔷薇耳钉 + 黑色牛皮表带军用怀表",
        "随身：双层牛皮武装带挂载短匕首、便携行囊与水壶"
      ],
      egg: "标准高马尾束得紧实利落，一场演练下来发根与后颈头皮紧绷酸涩。只有白屿能精准察觉，每次演武结束都会第一时间走过来，指尖替她松开发绳，掌心顺着发缝轻轻按揉发根舒缓酸胀。",
      img: "./images/chien-jirong.jpg"
    },
    "chien-liuwei": {
      theme: "chien-theme",
      tag: "顶级礼服",
      title: "鎏薇 · 盛典礼服",
      subtitle: "王室晚宴 · 册封祭祀",
      scenes: "王室晚宴、开国庆典、家族祭祀、重大外交会晤、册封仪式等顶级正式场合，庄重华贵，仪式感拉满。",
      version: "收腰鱼尾拖地长裙，微立领设计。上身贴合身形，膝盖处裙摆自然散开呈鱼尾状，40公分小拖尾；原生落肩不加垫肩，保留本身直角肩线条，弱化攻击性凸显优雅。",
      fabric: "主色正红色亮面重磅真丝，墨黑真丝衬里；裙摆金线刺绣渐变，腰侧浓金过渡到裙摆浅金。内层重磅哑光真丝，外层亮面真丝覆薄纱，金线混嵌红宝石碎钻绣满渐变蔷薇纹样。",
      details: [
        "裙摆外层渐变蔷薇绣纹，腰侧整朵盛放，向下过渡为细碎花瓣枝蔓",
        "腰侧裙摆接缝处藏手工刺绣家族纹章，侧身时才隐约显露",
        "后背隐形拉链，拉链头为迷你蔷薇金造型，两侧真丝包边防摩擦",
        "内层同色定型衬裙，保证鱼尾裙摆垂坠弧度，坐下不过度褶皱"
      ],
      match: [
        "鞋履：正红色缎面5cm高跟鞋，鞋头绣细小金蔷薇，鞋底静音处理",
        "配饰：红宝石家族徽章 + 蔷薇金红宝石耳钉 + 细款蔷薇金手链",
        "手持：同色系丝绸手包，大小刚好放入手帕与印章"
      ],
      egg: "由白屿亲手盘制精致低盘发，两侧编细鱼骨辫绕至脑后盘成圆润发髻，发间插蔷薇金缠枝簪，再别一朵清晨新摘的浅蓝无尽夏。池恩全程闭目养神任由他摆弄，等他说“好了”才抬眼看向镜中，嘴角露出极淡的笑意。",
      img: "./images/chien-liuwei.jpg"
    },
    "chien-anji": {
      theme: "chien-theme",
      tag: "轻公务装",
      title: "暗棘 · 外出常服",
      subtitle: "领地巡查 · 骑马出行",
      scenes: "领地巡查、市集走访、贵族私访、出城短途公务、骑马出行等轻公务场景，兼顾行动便利与贵族辨识度。",
      version: "短款收腰立领外套+基础衬衫+高腰直筒长裤，利落出行廓形。外套长度刚好盖过胯骨，偏高腰收腰优化比例；暗扣门襟线条流畅；裤脚平整收进短靴，走路骑马均无束缚。",
      fabric: "外套主色哑光墨黑，领口门襟压酒红细滚边，黑红配比约8:2。薄款羊毛混纺，挺括不厚重，防风性佳；内搭奶白真丝衬衫，长裤哑光西装料，垂坠抗皱适合长时间行走。",
      details: [
        "左胸别缩小版蔷薇金徽章，直径仅为常服款一半，低调表明身份",
        "可调节立领，非正式场合解开第一颗扣，风沙大时可全扣护颈",
        "两侧加深暗袋存放手信、印章等，内侧保密暗袋存放重要文书",
        "可调节绑带袖口，抬手办事、骑马时可收紧避免衣袖晃动"
      ],
      match: [
        "鞋履：黑色2.5cm低跟牛皮短靴，靴面极淡蔷薇压纹，鞋底偏软防滑",
        "配饰：日常款蔷薇金耳钉 + 酒红色细款牛皮腰带",
        "可选：远途出行搭配黑色羊毛披风，领口绣细金蔷薇纹"
      ],
      egg: "出门前由白屿替她扎一束低马尾，位置在后颈正中，既不被风吹乱又不会紧绷头皮。他总爱顺手从左侧鬓角编一条细麻花辫绕进马尾，再系一截酒红色丝带到发尾收尾。池恩途中摸到发尾的丝带，嘴角会不自觉软下来。",
      img: "./images/chien-anji.jpg"
    },
    "chien-wuwei": {
      theme: "chien-theme",
      tag: "居家便服",
      title: "雾薇 · 私邸常服",
      subtitle: "庄园休憩 · 独处时光",
      scenes: "庄园内非公务时段穿着，书房独处、日常用餐、午后休憩、与白屿相处等私密场景，是最松弛不设防的状态。",
      version: "宽松立领衬衫+高腰垂感阔腿裤两件套，外搭薄款针织开衫。衬衫偏宽松，领口自然解开两颗扣，袖口可挽至小臂；阔腿裤半松紧高腰，免去皮带束缚，裤腿垂顺至脚踝。",
      fabric: "主色雾炭灰色，极淡同色系蔷薇暗纹，侧光下才隐约浮现。磨毛棉混真丝，亲肤柔软带细微绒感，温润不凉又足够挺括；针织开衫为同色系羊毛混纺，触感软糯保暖。",
      details: [
        "门襟内侧、裤脚内侧绣细小金色蔷薇枝蔓，私密专属细节",
        "哑光黑玛瑙衬衫纽扣，表面刻迷你蔷薇浮雕，细节处保有精致感",
        "裤腰侧缝隐形口袋，可存放发绳、书签、小点心等细碎物件",
        "领口袖口双层软布包边，避免面料边缘摩擦肌肤泛红"
      ],
      match: [
        "鞋履：软底羊皮便鞋，鞋底极薄走路几乎无声",
        "配饰：仅保留一枚小巧蔷薇耳钉，天凉外搭同色系针织开衫",
        "随身：口袋常揣便携书签与细发绳，偶尔放一小块点心"
      ],
      egg: "是白屿“摆弄头发”的专属主场。池恩大多随性披发，白屿总爱凑过来，拿丝带或随手摘的小花变着花样做造型——耳侧编鱼骨辫、松松挽低丸子头，甚至编满头细辫再拆开弄出自然微卷。池恩只顾着看书，全程头都不抬，任由他折腾。",
      img: "./images/chien-wuwei.jpg"
    },

    // ===== 白屿四套 =====
    "baiyu-yunqi": {
      theme: "baiyu-theme",
      tag: "日常常服",
      title: "云栖 · 庄园日常轻洋装",
      subtitle: "花房打理 · 下午茶闲谈",
      scenes: "庄园内散步、花房打理、日常画符、陪同池恩处理庶务、下午茶闲谈，平衡松弛与得体。",
      version: "高腰收腰A字中长裙，裙长落在小腿中部最纤细位置。斜交领设计可通过暗扣调节深度，七分袖恰好覆盖小臂，裙摆两侧小开叉，剪裁宽松有度不贴身紧绷。",
      fabric: "主色月白揉浅青低饱和冷调，哑光处理不反光刺眼。高支柔光棉麻混纺，砂洗软化，触感柔软不扎肤；织法紧密物理防晒优秀，透气不闷汗，抗皱性好打理成本低。",
      details: [
        "交领沿边绣银灰色流云暗纹，中州符术一脉传统纹样，远看无痕近看精致",
        "同色系素面丝绦腰侧松打平安结，结旁预留挂袢可斜插玉柄符笔",
        "裙摆内侧左右隐形暗袋，分别收纳折叠符纸与便携墨条、迷你砚台",
        "交领内侧两粒暗扣，强光时扣至最高护颈，室内解开两粒更舒适"
      ],
      match: [
        "鞋履：米白色软底小皮鞋，平底轻盈无声，鞋头针尖大小云纹暗绣",
        "配饰：浅茶色圆框护目镜 + 玉珠耳钉 + 素面绣花香囊（可选）",
        "随身：袖口内侧藏细发绳，口袋常揣几粒花种"
      ],
      egg: "标志性短发+脑后细发辫，碎刘海自然垂落。陪池恩处理公文时蜷在软榻上画符，午后阳光照进来发丝滑到眼前。池恩总会停下笔，伸手帮她把碎发别到耳后，指尖蹭过她微凉的耳尖，她就晃一晃脑后的小发辫，弯起眼睛露出梨涡。",
      img: "./images/baiyu-yunqi.jpg"
    },
    "baiyu-jiyue": {
      theme: "baiyu-theme",
      tag: "宴会礼服",
      title: "霁月 · 正式宴会礼装",
      subtitle: "贵族晚宴 · 官方接见",
      scenes: "公国贵族宴会、官方接见、家族庆典等正式社交场合，陪同池恩出席公开活动时穿着，端庄清雅有分寸。",
      version: "欧式高收腰落地小拖尾礼服裙，胸下两指高腰线优化比例，大A字裙摆自然铺开，30公分小拖尾。内层同色吊带衬裙，外层罩七分广袖薄纱开衫，对襟自然敞开，中式叠穿层次感。",
      fabric: "主色冷调烟月白，腰际向下晕染极淡青灰渐变，过渡自然。内层重磅哑光真丝，垂坠感强不反光；外层柔光乔其纱，半透朦胧质感过滤强光、保护手臂，自带飘逸氛围感。",
      details: [
        "裙摆内层暗绣缠枝流云与浅粉玫瑰纹样，灯光下透出珍珠光泽，远素近巧",
        "白玉珠串腰链替代西式腰封，末端垂护身符纹小玉坠，走动时轻晃",
        "右侧裙缝隐形拉链口袋，可放下超薄符纸与一枚护身玉符",
        "内层吊带领口柔软蕾丝包边不磨肤，外层对襟滚极细银线添精致感"
      ],
      match: [
        "鞋履：奶白色缎面3cm低跟小高跟鞋，鞋头绣极小玫瑰暗纹",
        "配饰：细金属框浅茶色平光镜 + 白玉水滴耳坠 + 银质流云胸针",
        "手持：素面真丝团扇，扇面绣淡色流云纹，防晒又雅致"
      ],
      egg: "脑后小发辫编得更紧实，两侧长发编细辫绕到脑后固定成半扎发，发间别一朵白色无尽夏。出席前池恩帮她别好耳坠、整理腰链。她总忍不住偷偷扯裙摆，池恩会轻轻按住她的手低声提醒坐端正，她鼓一下腮帮子乖乖坐好，眼尾却藏着笑意。",
      img: "./images/baiyu-jiyue.jpg"
    },
    "baiyu-xianhua": {
      theme: "baiyu-theme",
      tag: "居家便服",
      title: "闲花 · 居家茶歇洋裙",
      subtitle: "深夜画符 · 私密独处",
      scenes: "室内休憩、花房闲坐、深夜画符、与池恩独处等私密场景，主打极致柔软松弛，最自在无防备的装束。",
      version: "宽松直筒茶歇裙，裙长至膝盖上方两指，参考中式中衣松弛感改良。宽交领可随意拉成斜襟或敞成小V领，宽袖管可挽至手肘，无强制收腰，盘腿坐、侧躺都无牵绊。",
      fabric: "主色奶白混浅灰冷调柔色，色温柔和不晃眼，暖光下也不刺激眼睛。多次水洗天丝棉，触感软糯亲肤如云朵；透气性极佳，边缘磨毛处理，不摩擦脆弱肌肤泛红。",
      details: [
        "领口、袖口、裙摆仅滚一圈极细青灰棉线，极简朴素贴合松弛状态",
        "两侧宽大插袋，深度直达手掌根部，能同时放下符笔、墨碟、花籽、点心",
        "同面料宽布带松松系在腰侧，结打得随意凌乱，随时能扯开无拘束",
        "领口袖口双层软布包边，避免面料边缘摩擦皮肤泛红"
      ],
      match: [
        "鞋履：米白色软布平底拖鞋，鞋底柔软有厚度，走路完全无声",
        "配饰：摘掉护目镜与耳钉，只戴一个简单圆条玉镯，中州旧物",
        "随身：口袋永远揣着几根细发绳与一小块擦拭符笔的软绒布"
      ],
      egg: "发型完全散乱，小发辫松了大半，碎发随意垂在脸颊颈侧，软乎乎的。深夜池恩处理完公文回房，总能看见她窝在软榻上画符，头发乱蓬蓬领口也歪着。池恩会坐过去帮她重新编好小发辫，指尖蹭过微凉的后颈，她就往后靠一靠，窝进池恩怀里像只粘人的小猫。",
      img: "./images/baiyu-xianhua.jpg"
    },
    "baiyu-qingye": {
      theme: "baiyu-theme",
      tag: "户外出行",
      title: "清野 · 庄园巡行外出装",
      subtitle: "郊外采风 · 领地巡察",
      scenes: "陪同池恩巡察庄园领地、户外短途出行、花房长时间劳作、慢行骑马、郊外采风，高防晒强行动力。",
      version: "欧式修身收腰中长裙，裙长至小腿中下三分之一，直身微A摆利落不拖沓。立领斜襟排布玉石暗扣，扣合严实护颈胸；长袖隐形袢带可挽至小臂固定；裙摆侧裙可扣起两寸露出内层衬裤。",
      fabric: "主色冷调雾灰蓝，低饱和莫兰迪色调，不吸光不反光，低调耐脏。高支密织棉麻混纺，柔光防泼溅工艺处理，密度高物理防晒优异，防风耐刮不易勾丝，轻微沾水不渗透。",
      details: [
        "斜襟边缘与腰封正面绣极淡银灰流云符纹，嵌入肌理远看如暗纹",
        "同面料宽腰封中式盘扣收束，两侧皮质挂环可悬挂符袋、墨匣、剪刀等工具",
        "裙身两侧大容量隐形插袋，腰封内侧保密小暗袋存放符印字条",
        "立领高度至下颌线下，扣合后全包颈部，领内软布包边不磨红"
      ],
      match: [
        "鞋履：雾灰蓝色哑光短筒低跟皮靴，防滑鞋底，鞋帮高至脚踝上方",
        "配饰：汉元素宽檐帷帽 + 夹片式护目镜 + 玉珠耳钉 + 护身玉符",
        "随身：腰封侧后方挂小巧皮质水囊，方便户外补水"
      ],
      egg: "小发辫编得整齐利落，碎发都用发夹固定，避免风吹糊脸。骑马时她坐在池恩身前，小发辫轻轻蹭过对方下巴。休息时池恩先帮她摘下帷帽，理开压乱的碎发再递水。她会摘一朵路边淡蓝小野花，踮脚别在池恩的高马尾上，然后笑着跑开。",
      img: "./images/baiyu-qingye.jpg"
    }
  };

  // 点击卡片打开弹窗
  outfitCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.outfit;
      const data = outfitData[key];
      if (!data) return;

      // 切换主题色
      modalContent.className = 'modal-content outfit-modal-content ' + data.theme;
      // 填充基础信息
      document.getElementById('modalTag').textContent = data.tag;
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalSubtitle').textContent = data.subtitle;
      document.getElementById('modalImg').src = data.img;
      // 填充详情模块
      document.getElementById('modalScenes').textContent = data.scenes;
      document.getElementById('modalVersion').textContent = data.version;
      document.getElementById('modalFabric').textContent = data.fabric;
      document.getElementById('modalDetails').innerHTML = data.details.map(i => `<li>${i}</li>`).join('');
      document.getElementById('modalMatch').innerHTML = data.match.map(i => `<li>${i}</li>`).join('');
      document.getElementById('modalEgg').textContent = data.egg;

      outfitModal.style.display = 'flex';
    });
  });

  // 关闭弹窗
  function closeOutfitModal() {
    outfitModal.style.display = 'none';
  }
  modalClose.addEventListener('click', closeOutfitModal);
  outfitModal.addEventListener('click', e => {
    if (e.target === outfitModal) closeOutfitModal();
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