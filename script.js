document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("cover").style.display = "none";
  document.getElementById("container").style.display = "block";
  renderScenario(0);
});

const eggButton = document.getElementById('egg-button');

eggButton.addEventListener('click', function() {
  window.location.href = 'egg.html';
});

const scenarios = [
  { //0
    scenario: [],
    narration: ["我 彼岸 是一位再普通不過的高中生 一切都很美好",
      "直到某天夜自習，我走在晚自習後",
      "發現大門沒有被打開，打開教學區鐵捲門",
      "突然間遇到怪"],
    dialogue: [],
    options: [],
  },
  { //1
    scenario: ["教室"],
    narration: [],
    dialogue: [
      "我: 夜自習終於結束了 該走了吧",
      "芙希: 走吧",
      "月安: 是說門怎麼沒開 詭異",
      "媃雅: 也許我們該去教職員辦公室看看 叫他們幫忙開個門",
      "我: 可以 走吧"
  ],
  },
  { //2
    scenario: ["教職員辦公室外"],
    narration: [],
    dialogue: [
      "我: 有人嗎",
      "芙希: 進去看看吧"
    ],
  },
  { //3
    scenario: ["職員辦公室內"],
    narration: [],
    dialogue: [
      "柔雅: 握草這邊發生甚麼事了",
      "我: 小心"
    ],
  },
  { //4
    scenario: [],
    narration: ["此時受傷的教職員撲了過來 並發動攻擊"],
    dialogue: [
      "芙希: 該做點甚麼吧",
      "我: 讓我想想",
      "我: 或許我們能"
    ],
    options: [
      { text: "把他拉進置物櫃 關起來 用東西擋住", nextScenario: 5 },
      { text: "讓我來吸引他 其他人負責 找鑰匙 找到就跑", nextScenario: 6 },
      { text: "安撫她", nextScenario: 7 },
    ],
  },
  { //5
    narration: ["你们成功将教职员锁进了置物柜，现在需要找钥匙继续前进。"],
    dialogue: [
      "芙希:要怎麼關呢",
      "我:交給我(拿起一旁的掃把 朝教職員腦後方打去)",
      "我:這不就解決了ez (將教職員丟入置物櫃 然後愜意的關上置物櫃的門 鎖上)",
      "月安:既然問題解決了 就來找鑰匙吧"
    ],
    options: [{ text: "~回到地下室", nextScenario: 0 }],
    
  },
  { //6
    scenario: [],
    dialogue: [
      "我:交給我吧 我來吸引他",
      "柔雅:交給你了 小心",
      "我:喔幹 我沒了 (此時你的頭髮被抓住了)",
      "教職員:(拿出切紙器 把你的頭放了上去 並用力按下)"],
    narration: ["此時教室-----",
    "你的頭掉到了地上 --離",
    "一瞬間 你的意識逐漸變得模糊",
    "最後兩眼撐大的--"]

  
  },
  { //7
    dialogue: [
      "我:交給我 我來試著安撫她",
      "教職員:(拿起桌邊的剪刀)",
    ],
    scenario: ["視野黑了一半 一切似乎還行",
      "此時教職員更用力的插入剪刀  你的腦-----",
      "此時的你倒在地上  ---流"],
    narration: ["你试图安抚教职员，但她的攻击让你措手不及。"]
  },
  { //8
    scenario: "找到警衛屍體",
    options: [
      { text: "搜身(大門鑰匙, 美女寫真集, 手機)繼續前進", nextScenario: 4 },
    ],
    narration: ["你发现了警卫的尸体，必须搜寻他身上的物品。"]
  }
];

let currentIndex = 0;

const backgroundMusic = document.getElementById('background-music');

document.getElementById('start-button').addEventListener('click', function() {
  playBackgroundMusic();
});

function playBackgroundMusic() {
  backgroundMusic.play();
}

function stopBackgroundMusic() {
  backgroundMusic.pause();
}

function typeWriter(element, text, delay = 50, callback) {
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, delay);
    } else if (callback) {
      callback();
    }
  }
  type();
}

function displayNarration(narration, index = 0) {
  const narrationElement = document.getElementById("narration");
  if (index < narration.length) {
    narrationElement.textContent = narration[index];
    setTimeout(() => {
      displayNarration(narration, index + 1);
    }, 1000);
  } else {
    setTimeout(() => {
      narrationElement.textContent = '';
      moveToNextStep('narration');
    }, 2000); 
  }
}

function renderScenario(index) {
  const currentScenario = scenarios[index];
  const scenarioElement = document.getElementById("scenario");
  const dialogueContainer = document.getElementById("dialogue-container");
  const narrationElement = document.getElementById("narration");

 
  scenarioElement.textContent = '';
  dialogueContainer.innerHTML = '';

  if (Array.isArray(currentScenario.scenario) && currentScenario.scenario.length > 0) {
    scenarioElement.textContent = currentScenario.scenario.join("\n");
    moveToNextStep('scenario');
  } else if (typeof currentScenario.scenario === 'string') {
    scenarioElement.textContent = currentScenario.scenario;
    moveToNextStep('scenario');
  } else {
    moveToNextStep('scenario');
  }
}

function renderDialogue(dialogue, index, options) {
  const scenarioElement = document.getElementById("scenario");
  typeWriter(scenarioElement, dialogue[index], 50, () => {
    scenarioElement.addEventListener("click", () => {
      if (index < dialogue.length - 1) {
        renderDialogue(dialogue, index + 1, options);
      } else {
        moveToNextStep('dialogue');
      }
    }, { once: true });
  });
}
function renderOptions(options, index) {
  const currentScenario = scenarios[index];
  const optionsElement = document.getElementById("options");
  optionsElement.innerHTML = "";
  if (options && options.length > 0) {
    options.forEach(option => { 
      const button = document.createElement("button");
      button.textContent = options.text;
      button.addEventListener("click", () => {
        renderScenario(options.nextScenario);
      });
      optionsElement.appendChild(button);
    });
  } else {
    moveToNextStep('options');
  }
}
function moveToNextStep(step) {
  const currentScenario = scenarios[currentIndex];

  switch (step) {
    case 'scenario':
      if (currentScenario.narration && currentScenario.narration.length > 0) {
        displayNarration(currentScenario.narration);
      } else {
        moveToNextStep('narration');
      }
      break;
    case 'narration':
      if (currentScenario.dialogue && currentScenario.dialogue.length > 0) {
        renderDialogue(currentScenario.dialogue, 0, currentScenario.options);
      } else {
        moveToNextStep('dialogue');
      }
      break;
    case 'dialogue':
      if (currentScenario.options && currentScenario.options.length > 0) {
        renderOptions(currentScenario.options);
      } else {
        moveToNextStep('options');
      }
      break;
    case 'options':
      currentIndex++;
      if (currentIndex < scenarios.length) {
        renderScenario(currentIndex);
      }
      break;
  }
}

renderScenario(0);