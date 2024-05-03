// 定義情境和選項
document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("cover").style.display = "none";
  document.getElementById("container").style.display = "block";
  renderScenario(0); // 開始第一個情境
});
const scenarios = [
  {
    scenario:
      "你走在晚自習後 發現大門沒有被打開，打開教學區鐵捲門，突然間遇到怪。",
    options: [
      { text: "1 要跑嗎", nextScenario: 1 },
      { text: " 2 給他死", nextScenario: 3 },
      { text: " 3 應該不是怪", nextScenario: 5 },
    ],
  },
  {
    scenario: "缺乏大門鑰匙",
    options: [{ text: "~回到地下室", nextScenario: 0 }],
  },
  {
    scenario: "找到警衛屍體",
    options: [
      { text: "搜身(大門鑰匙, 美女寫真集, 手機)繼續前進", nextScenario: 4 },
    ],
  },
  {
    scenario: "weapon",
    options: [
      { text: "乾哥的彈簧刀", nextScenario: 4 },
      { text: "掃把", nextScenario: 4 },
      { text: "雙手", nextScenario: 4 },
    ],
  },
  {
    scenario: "原來是看錯",
    options: [{ text: "找到警衛屍體(分屍)", nextScenario: 2 }],
  },
  {
    scenario: "探索地下室",
    options: [{ text: "靠背真的有怪", nextScenario: 6 }],
  },
  {
    scenario: "太近沒辦法反應~團滅~game over",
    options: [{ text: "~回到地下室", nextScenario: 0 }],
  },
  {
    scenario: "找到警衛屍體",
    options: [
      { text: "搜身(大門鑰匙, 美女寫真集, 手機)繼續前進", nextScenario: 4 },
    ],
  },

  {
    scenario: "你走出了森林，安全地回到了家。",
    options: [],
  },
];

// 渲染情境和選項
function renderScenario(index) {
  const currentScenario = scenarios[index];
  const scenarioElement = document.getElementById("scenario");
  const optionsElement = document.getElementById("options");

  scenarioElement.textContent = currentScenario.scenario;
  optionsElement.innerHTML = "";

  currentScenario.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option.text;
    button.addEventListener("click", () => {
      renderScenario(option.nextScenario);
    });
    optionsElement.appendChild(button);
  });
}

// 啟動遊戲
renderScenario(0);
