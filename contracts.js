
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
    </div>`;
  }
  document.getElementById("contractList").innerHTML = html;
}
window.onload = loadContracts;
