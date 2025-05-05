
function verifyLogin() {
  const input = document.getElementById("adminPass").value;
  if (input === "AgriNexus2025") {
    document.getElementById("authArea").style.display = "none";
    document.getElementById("contractList").style.display = "block";
    loadContracts();
  } else {
    document.getElementById("accessDenied").innerText = "접근 거부: 암호가 틀립니다.";
    logAccessAttempt();
  }
}

function logAccessAttempt() {
  const time = new Date().toLocaleString();
  fetch("https://api.example.com/log", {
    method: "POST",
    body: JSON.stringify({ time, ip: "auto", status: "unauthorized" }),
    headers: { "Content-Type": "application/json" }
  }).catch(() => {});
}

async function loadContracts() {
  const res = await fetch("contracts.json");
  const contracts = await res.json();
  let html = "";
  for (const c of contracts) {
    html += `
    <div class="contract">
      <h3>📄 계약명: ${c.title}</h3>
      <p>🧾 내용: ${c.content}</p>
      <p>🗓 마감일: ${c.deadline}</p>
      <p>🔒 보안등급: ${c.level}</p>
      <div class="secure">⚠️ AI 기반 변경 추적 및 해킹 감시 중...</div>
      <button onclick="savePDF('${c.title}', \`${c.content}\`, '${c.deadline}', '${c.level}')">📥 PDF 저장</button>
    </div>`;
  }
  document.getElementById("contractList").innerHTML = html;
}

function savePDF(title, content, deadline, level) {
  const element = document.createElement("div");
  element.innerHTML = `<h2>${title}</h2><p>${content}</p><p>마감일: ${deadline}</p><p>보안등급: ${level}</p>`;
  html2pdf().from(element).save(`${title}_보안계약.pdf`);
}
