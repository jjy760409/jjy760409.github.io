
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
      <div class="secure">⚠️ 이 계약은 AgriNexus의 글로벌 보호 시스템에 의해 실시간 감시되고 있습니다.</div>
      <button onclick="savePDF('${c.title}', \`${c.content}\`, '${c.deadline}', '${c.level}')">📥 PDF 저장</button>
    </div>`;
  }
  document.getElementById("contractList").innerHTML = html;
}
window.onload = loadContracts;

function savePDF(title, content, deadline, level) {
  const element = document.createElement("div");
  element.innerHTML = `<h2>${title}</h2><p>${content}</p><p>마감일: ${deadline}</p><p>보안등급: ${level}</p>`;
  html2pdf().from(element).save(`${title}_보안계약.pdf`);
}
