
const data = [
  { date: "2025-05-01", revenue: 230000, cost: 70000 },
  { date: "2025-05-02", revenue: 310000, cost: 90000 },
  { date: "2025-05-03", revenue: 280000, cost: 80000 },
  { date: "2025-05-04", revenue: 350000, cost: 100000 },
  { date: "2025-05-05", revenue: 390000, cost: 120000 }
];

function format(num) {
  return num.toLocaleString("ko-KR") + "원";
}

function renderSummary() {
  let totalRevenue = 0, totalCost = 0;
  data.forEach(d => {
    totalRevenue += d.revenue;
    totalCost += d.cost;
  });
  const net = totalRevenue - totalCost;
  document.getElementById("summary").innerHTML = `
    ✅ 총 매출: ${format(totalRevenue)}<br>
    💸 총 비용: ${format(totalCost)}<br>
    💰 순이익: ${format(net)}<br>
    📆 주간 평균 순이익: ${format(net / data.length)}
  `;
}

function renderTable() {
  const tbody = document.getElementById("revenueTable");
  data.forEach(d => {
    const net = d.revenue - d.cost;
    const row = `<tr><td>${d.date}</td><td>${format(d.revenue)}</td><td>${format(d.cost)}</td><td>${format(net)}</td></tr>`;
    tbody.innerHTML += row;
  });
}

function downloadPDF() {
  const time = new Date().toLocaleString();
  const log = document.getElementById("logList");
  const li = document.createElement("li");
  li.innerText = `📄 계약서 다운로드 - 과금 처리됨 (₩9,900) - ${time}`;
  log.appendChild(li);
  const element = document.createElement("div");
  element.innerHTML = "<h1>계약서</h1><p>AgriNexus 스마트 계약서 자동 생성 예시입니다.</p>";
  html2pdf().from(element).save("AgriNexus_계약서.pdf");
}

window.onload = () => {
  renderSummary();
  renderTable();
};
