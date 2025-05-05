
import datetime

def generate_proposal(user_name, investment_focus):
    today = datetime.date.today().strftime("%Y-%m-%d")
    with open("templates/proposal_template.txt", "r", encoding="utf-8") as f:
        template = f.read()
    return template.replace("{NAME}", user_name).replace("{FOCUS}", investment_focus).replace("{DATE}", today)
