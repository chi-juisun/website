const startButton = document.getElementById('start-button');
const cover = document.getElementById('cover');
const container = document.getElementById('container');
const scenarioDisplay = document.getElementById('scenario');
const narrationDisplay = document.getElementById('narration');
const dialogueContainer = document.getElementById('dialogue-container');
const dialogueDisplay = document.getElementById('dialogue');
const optionsDisplay = document.getElementById('options');
const backgroundMusic = document.getElementById('background-music');
const eggButton = document.getElementById('egg-button');

let currentScenarioIndex = 0;

startButton.addEventListener('click', () => {
  cover.style.display = 'none';
  container.style.display = 'block';
  playBackgroundMusic();
  renderScenario(0);
});

eggButton.addEventListener('click', () => {
  window.location.href = 'egg.html';
});

function playBackgroundMusic() {
  backgroundMusic.play();
}

function stopBackgroundMusic() {
  backgroundMusic.pause();
}

const scenarios = [
  ["教室", { nextdialogues: 0 }],
  ["教職員辦公室外", { nextdialogues: 1 }],
  ["教職員辦公室內", { nextdialogues: 2 }],
  ["地下室", { nextdialogues: 3 }],
  ["校門口", { nextdialogues: 4 }],
  ["超市", { nextdialogues: 5 }],
];

const narrations = [
  [
    "我 彼岸 是一位再普通不過的高中生 一切都很美好",
    "直到某天夜自習，我走在晚自習後", { nextdialogues: 0 }
  ],
  ["此時受傷的教職員撲了過來 並發動攻擊", { nextdialogues: 0 }],
  ["你们成功将教职员锁进了置物柜，现在需要找钥匙继续前进。", { nextdialogues: 0 }],
  ["此時教室-----", "你的頭掉到了地上 --離", "一瞬間 你的意識逐漸變得模糊", "最後兩眼撐大的--", { nextdialogues: 0 }],
  ["你试图安抚教职员，但她的攻击让你措手不及。", { nextdialogues: 0 }],
  ["你发现了警卫的尸体，必须搜寻他身上的物品。", { nextdialogues: 0 }]
];

const dialogues = [
  [
    "我: 夜自習終於結束了 該走了吧",
    "芙希: 走吧",
    "月安: 是說門怎麼沒開 詭異",
    "媃雅: 也許我們該去教職員辦公室看看 叫他們幫忙開個門",
    "我: 可以 走吧", { nextscenarios: 1 }
  ],
  ["我: 有人嗎", "芙希: 進去看看吧", { nextdialogues: 0 }],
  ["柔雅: 握草這邊發生甚麼事了", "我: 小心", { nextdialogues: 0 }],
  [
    "芙希: 該做點甚麼吧",
    "我: 讓我想想",
    "我: 或許我們能", { nextdialogues: 0 }
  ],
  [
    "芙希:要怎麼關呢",
    "我:交給我(拿起一旁的掃把 朝教職員腦後方打去)",
    "我:這不就解決了ez (將教職員丟入置物櫃 然後愜意的關上置物櫃的門 鎖上)",
    "月安:既然問題解決了 就來找鑰匙吧", { nextdialogues: 0 }
  ],
  [
    "我:交給我吧 我來吸引他",
    "柔雅:交給你了 小心",
    "我:喔幹 我沒了 (此時你的頭髮被抓住了)",
    "教職員:(拿出切紙器 把你的頭放了上去 並用力按下)", { nextdialogues: 0 }
  ],
  [
    "我:交給我 我來試著安撫她",
    "教職員:(拿起桌邊的剪刀)", { nextdialogues: 0 }
  ]
];

const options = [
  [
    { text: "把他拉進置物櫃 關起來 用東西擋住", nextScenario: 3 },
    { text: "讓我來吸引他 其他人負責 找鑰匙 找到就跑", nextScenario: 6 },
    { text: "安撫她", nextScenario: 7 }
  ],
  [{ text: "~回到地下室", nextScenario: 3 }],
  [{ text: "搜身(大門鑰匙, 美女寫真集, 手機)繼續前進", nextScenario: 4 }]
];

function renderScenario(index) {
  currentScenarioIndex = index;

  scenarioDisplay.innerText = scenarios[index][0];
  narrationDisplay.innerText = '';
  dialogueDisplay.innerText = '';
  optionsDisplay.innerText = '';

  if (narrations[index].length > 0) {
    displayNarration(narrations[index], 0);
  } else if (dialogues[index].length > 0) {
    displayDialogue(dialogues[index], 0);
  } else if (options[index].length > 0) {
    displayOptions(options[index]);
  }
}

function displayNarration(narrationArray, index) {
  if (index < narrationArray.length) {
    narrationDisplay.innerText = narrationArray[index];
    setTimeout(() => {
      displayNarration(narrationArray, index + 1);
    }, 2000); // Delay between narration lines
  } else {
    if (dialogues[currentScenarioIndex].length > 0) {
      displayDialogue(dialogues[currentScenarioIndex], 0);
    } else if (options[currentScenarioIndex].length > 0) {
      displayOptions(options[currentScenarioIndex]);
    }
  }
}

function displayDialogue(dialogueArray, index) {
  if (index < dialogueArray.length) {
    dialogueDisplay.innerText = dialogueArray[index];
    setTimeout(() => {
      displayDialogue(dialogueArray, index + 1);
    }, 2000); // Delay between dialogue lines
  } else {
    if (options[currentScenarioIndex].length > 0) {
      displayOptions(options[currentScenarioIndex]);
    }
  }
}

function displayOptions(optionsArray) {
  optionsDisplay.innerHTML = '';
  optionsArray.forEach((option, index) => {
    const button = document.createElement('button');
    button.innerText = option.text;
    button.addEventListener('click', () => {
      renderScenario(option.nextScenario);
    });
    optionsDisplay.appendChild(button);
  });
}

renderScenario(0);
