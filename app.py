
from flask import Flask, request, send_file, render_template_string
from fpdf import FPDF
import smtplib
from email.message import EmailMessage
import os

app = Flask(__name__)

HTML_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head><title>투자 계약 생성 완료</title></head>
<body>
<h1>✅ 계약서가 성공적으로 생성되었습니다.</h1>
<p>PDF 파일이 이메일로 발송되었습니다.</p>
</body>
</html>
'''

@app.route("/generate_contract", methods=["POST"])
def generate_contract():
    investor_name = request.form.get("investor_name")
    email = request.form.get("email")
    investment_type = request.form.get("investment_type")
    amount = request.form.get("amount")
    notes = request.form.get("notes")

    # Create PDF
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="AgriNexus 투자 계약서", ln=True, align="C")
    pdf.ln(10)
    pdf.cell(200, 10, txt=f"투자자 이름: {investor_name}", ln=True)
    pdf.cell(200, 10, txt=f"이메일: {email}", ln=True)
    pdf.cell(200, 10, txt=f"투자 유형: {investment_type}", ln=True)
    pdf.cell(200, 10, txt=f"투자 금액: ₩{amount}", ln=True)
    pdf.multi_cell(0, 10, txt=f"비고: {notes}", align="L")

    filename = f"/tmp/{investor_name}_contract.pdf"
    pdf.output(filename)

    # Send email with attachment
    msg = EmailMessage()
    msg["Subject"] = "AgriNexus 투자 계약서"
    msg["From"] = "noreply@agrinexus.world"
    msg["To"] = email
    msg.set_content("첨부된 PDF 파일은 귀하의 투자 계약서입니다. 감사합니다.")

    with open(filename, "rb") as f:
        file_data = f.read()
        msg.add_attachment(file_data, maintype="application", subtype="pdf", filename=os.path.basename(filename))

    # Dummy SMTP for placeholder
    try:
        with smtplib.SMTP("localhost") as smtp:
            smtp.send_message(msg)
    except Exception as e:
        print("Email send failed (SMTP config needed):", e)

    return render_template_string(HTML_TEMPLATE)

if __name__ == "__main__":
    app.run(debug=True)
