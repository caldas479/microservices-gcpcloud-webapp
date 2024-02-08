import json

state_file = "terraform.tfstate"

with open(state_file, "r") as f:
    state_data = json.load(f)

def remove_last_3_chars(input_str):
    return input_str[:-3]

names =[]
ips = []
outputs = state_data.get("outputs", {})
ip_addresses = {}
for output_name, output_data in outputs.items():
    if output_data.get("type") == "string":
        names += [remove_last_3_chars(output_name)]
        ips += [output_data.get("value")]
    if output_data.get("type") == ["list", "string"]:
        for i in range(len(output_data.get("value"))):
            names += [remove_last_3_chars(output_name) + str(i+1)]
            ips += [output_data.get("value")[i].split("= ")[1]]

with open("gcphosts", "r") as hosts_file:
    lines = hosts_file.readlines()

for i in range(5,17):
    lines[i] = f"{names[i - 5]} ansible_host={ips[i-5]} ansible_user=ubuntu ansible_connection=ssh\n"

with open("gcphosts", "w") as hosts_file:
    hosts_file.writelines(lines)

with open('/etc/hosts', "a") as hosts_file:
    for i in range(len(names)):
        hosts_file.write("\n" + ips[i] + ' ' + names[i])
    hosts_file.write("\n")

with open("frontend/quote-app-ui/src/App.js", "r") as frontend:
    frontend_lines = frontend.readlines()
frontend_lines[17] = f"    fetch('http://{ips[8]}:80/api/quoteapp/get-quotes')\n"
frontend_lines[28] = f"    fetch('http://{ips[9]}:80/api/quoteapp/add-quote', ""{""\n"
frontend_lines[40] = f"    fetch('http://{ips[10]}:80/api/quoteapp/delete-quote' + `?id=$""{""id""}""`, ""{""\n"

with open("frontend/quote-app-ui/src/App.js", "w") as frontend:
    frontend.writelines(frontend_lines)