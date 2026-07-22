// ==============================================
// 👉 你的对话剧本写在这里！照着格式复制就能加新场景
// ==============================================
const dialogueScenes = [
    {
        id: "scene1",
        title: "日常·傍晚的阳台",
        messages: [
            { role: "baiyu", text: "今天的晚霞很好看，要过来一起看吗？" },
            { role: "chien", text: "……你又没提前说，我头发还没吹干。" },
            { role: "baiyu", text: "没关系，这样也很好看。" },
            { role: "chien", text: "……少来。你手里藏的什么？" },
            { role: "baiyu", text: "路过便利店买的草莓牛奶，给你的。" },
            { role: "chien", text: "……算你有心。" }
        ]
    },
    {
        id: "scene2",
        title: "拌嘴·谁先认输",
        messages: [
            { role: "chien", text: "这件事明明是你考虑不周。" },
            { role: "baiyu", text: "好好好，我的问题。" },
            { role: "chien", text: "你能不能有点诚意？每次都这样。" },
            { role: "baiyu", text: "那……池恩小姐教教我，怎么做才算有诚意？" },
            { role: "chien", text: "……你故意的是吧。" },
            { role: "baiyu", text: "嗯，故意的。" }
        ]
    }
    // 加新场景：在上面最后一个大括号后面加逗号，再复制一整个对象
];

// ==============================================
// 下面是自动渲染逻辑，不用改，直接用
// ==============================================
const sceneTabs = document.getElementById('sceneTabs');
const dialogueBox = document.getElementById('dialogueBox');
const replayBtn = document.getElementById('replayBtn');

let currentSceneIndex = 0;
let timer = null;

// 生成场景按钮
function renderTabs() {
    sceneTabs.innerHTML = '';
    dialogueScenes.forEach((scene, index) => {
        const tab = document.createElement('div');
        tab.className = `scene-tab ${index === 0 ? 'active' : ''}`;
        tab.textContent = scene.title;
        tab.onclick = () => switchScene(index);
        sceneTabs.appendChild(tab);
    });
}

// 切换场景
function switchScene(index) {
    currentSceneIndex = index;
    document.querySelectorAll('.scene-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
    playDialogue();
}

// 逐条播放对话
function playDialogue() {
    if (timer) clearInterval(timer);
    dialogueBox.innerHTML = '';
    
    const messages = dialogueScenes[currentSceneIndex].messages;
    let i = 0;

    timer = setInterval(() => {
        if (i >= messages.length) {
            clearInterval(timer);
            return;
        }
        addMessage(messages[i]);
        i++;
        dialogueBox.scrollTop = dialogueBox.scrollHeight;
    }, 800); // 数字越大，对话出现越慢（单位毫秒）
}

// 添加单条消息气泡
function addMessage(msg) {
    const item = document.createElement('div');
    item.className = `msg-item msg-${msg.role}`;
    
    item.innerHTML = `
        <div class="msg-avatar">
            <img src="images/avatar/${msg.role}.jpg" alt="${msg.role}" onerror="this.style.display='none'">
        </div>
        <div class="msg-bubble">${msg.text}</div>
    `;
    
    dialogueBox.appendChild(item);
}

// 重播按钮
replayBtn.onclick = playDialogue;

// 页面加载完成后自动运行
window.onload = () => {
    renderTabs();
    playDialogue();
};