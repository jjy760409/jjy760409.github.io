
from flask import Flask, request, render_template, send_file
from fpdf import FPDF
import datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form["name"]
        focus = request.form["focus"]
        email = request.form["email"]
        pdf_path = generate_pdf(name, focus)
        send_email(email, pdf_path, name)
        return "제안서가 이메일로 전송되었습니다!"
    return render_template("form.html")

def generate_pdf(name, focus):
    today = datetime.date.today().strftime("%Y-%m-%d")
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="AgriNexus World 투자 제안서", ln=True, align="C")
    pdf.ln(10)
    pdf.multi_cell(0, 10, txt=f"작성일: {today}\n\n"
                              f"안녕하세요 {name}님,\n\n"
                              f"AgriNexus World는 전세계 스마트팜 및 글로벌 물류 시스템을 통합한 혁신 기업입니다.\n"
                              f"당신의 투자 관심 분야: {focus}\n\n"
                              f"우리는 AI 기반 자동화, 위성 물류 추적, 글로벌 유통, 스마트 설계 시뮬레이션 등\n"
                              f"다양한 핵심 기술을 통해 최고의 수익성과 지속가능한 성장을 이끌고 있습니다.\n\n"
                              f"감사합니다.\nAgriNexus World 드림")
    file_path = f"static/{name}_proposal.pdf"
    pdf.output(file_path)
    return file_path

def send_email(to_email, file_path, name):
    from_email = "your_email@example.com"
    password = "your_password"

    msg = MIMEMultipart()
    msg["From"] = from_email
    msg["To"] = to_email
    msg["Subject"] = "AgriNexus World 투자 제안서"

    body = f"{name}님, 첨부된 투자 제안서를 확인해주세요. 감사합니다. - AgriNexus World"
    msg.attach(MIMEText(body, "plain"))

    with open(file_path, "rb") as f:
        part = MIMEText(f.read(), "base64", "utf-8")
        part.add_header("Content-Disposition", f"attachment; filename={name}_proposal.pdf")
        part.add_header("Content-Type", "application/pdf; name={name}_proposal.pdf")
        msg.attach(part)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(from_email, password)
        server.send_message(msg)

if __name__ == "__main__":
    app.run(debug=True)
