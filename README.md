# AGISIT PROJECT

## Authors
Group 10:
- Afonso Ponces de Carvalho - 99046
- Francisco Nunes Sanchez - 99071
- Tiago Caldas - 99125

## Introduction
With this project our goal is to show how to set up a web application that uses microservices and runs on a cloud service. We're going to use tools like Terraform and Ansible to automate the process. For hosting, we'll rely on Google Cloud Platform. To keep an eye on everything and gather information, we'll use tools like Prometheus and Grafana. This project is all about making a complex task look simple and showcasing the importance of smooth operations in a modern, cloud-based application setup.

## Prerequisites
To deploy this solution there are some tools you need to install before starting:

- Vagrant
- Virtualbox
- Virtualbox extension pack
- GCP account with credits
- IDE of your choice

## Application Design
Regarding the "Quote of the Day App" application, it comprises just three core functions, each executed by one of the three backend services developed with NodeJS Express. These functions include retrieving quotes from the database and displaying them using the GET method, adding new quotes to the database through the POST method, and deleting quotes from the database using the DELETE method. 

In the context of the frontend, implemented with React, it maintains a straightforward design, as it is not the central focus of this project. 

Lastly, MongoDB was chosen as the database solution due to its non-relational structure, which makes it user-friendly for this project.

The image below shows the appearance of the app:
![](https://cdn.discordapp.com/attachments/1103041627200696431/1165311449992798288/image.png?ex=654663dc&is=6533eedc&hm=3fd794cf6db723bcf33b3e7e327e6eaf5ecef2e14721178ee5f23f1fc230ed2d&)


## Project Architecture
We opted for the load balancing solution because we believed it to be the most favorable path forward, one that everyone felt comfortable with. Balancing the backend layer is essential to ensure the scalability, resilience, efficiency, and ability to handle various user requests within our system. This approach mitigates bottlenecks and maintains the application's reliability, even under high traffic conditions.

Our final project was implemented on Google Cloud Platform using Terraform, an infrastructure as code tool that enables you to define cloud resources in human-readable configuration files that can be versioned and reused.

In the **terraform-gcp-variables.tf** file, you'll notice that each instance's machine type is set to n1-standard-1, running an Ubuntu 20.04 image. While the machine type can vary, this choice sufficed for our application due to the simplicity of the programs that would be run. The instances are deployed in the **europe-west2-c** and **europe-west4-b** zones.

In the **terraform-gcp-servers.tf** file, you can observe all Google Compute instances created to ensure a highly available app, utilizing the zones and images variables defined in the variables file.

Lastly, the **terraform-gcp-networks.tf** file outlines all the network and firewall rules established for this project. The database listens on port 27017 (MongoDB's default port). The Backend VM groups, including get-service(1 and 2), add-service(1 and 2), and delete-service(1 and 2), listen on ports 5041, 5042, and 5043, respectively. The frontend listens on port 3000 (accessible with frontend_ip:3000 to view the running app). The monitoring VM listens on ports 3000 (Grafana) and 9090 (Prometheus). All three load balancers listen on ports 80 and 443, and all servers listen on port 9100 (Node Exporter's default port) for the monitoring service to collect data from all instances.

Below is an image to clarify and simply demonstrate the overall infrastructure:

![](https://cdn.discordapp.com/attachments/1103041627200696431/1165277803265147000/Captura_de_ecra_2023-10-21_141438.png?ex=65464486&is=6533cf86&hm=d47f3ea64a1a816e44d45d87816bd4472cacd03fdb92ff9b4b94f0bfb1eb8255&)

![](https://cdn.discordapp.com/attachments/1103041627200696431/1165305611886542848/image.png?ex=65465e6c&is=6533e96c&hm=c28f1f8f7de4a1ece59c24c9d6f8774a20c2be5aad59ffcc33bb11015849ca65&)

## Configure, Deploy and Start the APP
### 1. In Google Cloud Platform: 

Your first task is to create a Project. For that purpose, select on the top Menu Bar the Organization/Projects drop down button, that will open a window for selecting and/or creating a Project, as illustrated in the following figure:
![](https://cdn.discordapp.com/attachments/1103041627200696431/1165306707187081307/img5.png?ex=65465f71&is=6533ea71&hm=b6c730fc66b34d6accb7273c2e91b46b79c24ce5b6d17d179276ee7e7e23988c&)

Now you need to Generate your Google Cloud credentials. For that purpose, you need to enable APIs and services for your Project, by choosing in the Google Cloud Console ’API & Services’ and next selecting ‘Enabled APIs and Services’, where you can see a button on the top menu for enabling those services, as illustrated in Figure:
![](https://cdn.discordapp.com/attachments/1103041627200696431/1165308072009412649/img7.png?ex=654660b6&is=6533ebb6&hm=6965d4b0100641a1b30c523b749ff821328f4ea63c66da40d4d9f23e9c5feb71&)

Selecting that button opens a new window for selecting the type of API (as in the following Figure). In that window search for Compute Engine api, select it and then click ENABLE
![](https://cdn.discordapp.com/attachments/1103041627200696431/1165308213940453477/img8.png?ex=654660d8&is=6533ebd8&hm=f512af7951d8d827b29b4de81bd7345a52385703d67ac0bf1de68997b4045bc5&)
When the API is enabled (it may take some time...) you can then, in the Google Cloud Console menu, select ‘IAM and Admin’ and next ‘Service Accounts’. You may then see that a Service Account for the Compute Engine default service account is created.
![](https://cdn.discordapp.com/attachments/1103041627200696431/1165308428600737882/img9.png?ex=6546610b&is=6533ec0b&hm=91fc07975613353f95d4e89198560ce621db3e3d8b96e8970da4afed59d2d3f2&)
There, in Actions, You select ’Manage keys’, that opens a new windows to select either ‘Create new key’ or ’Upload existing key’:
![](https://cdn.discordapp.com/attachments/1103041627200696431/1165308591998259280/img10.png?ex=65466132&is=6533ec32&hm=bc77c613c7a6957cacb2c85128b4a9c886c400cced7c9b5d37f48435621a2c6d&)
Select ’Create new key’, which opens a pop-up window in which you select the JSON checkbox, as illustrated in the following Figure, which will download to your computer a Credentials file.

![](https://cdn.discordapp.com/attachments/1103041627200696431/1165308813671419925/img11.png?ex=65466167&is=6533ec67&hm=56e3c8e3d632c3ba434d9cec48afcfcb61475173d44e0492b161484ea7b74877&)

Save the file to the **gcpcloud** folder. The Credentials file has your keys to access the GCP service and should be kept safe

### 2. In Project Directory:
- Run **vagrant up mgmt**
- Run **vagrant ssh mgmt**

### 3. In terraform-gcp-variables.tf File:
- Change to your own variables

### 4. In terraform-gcp-provider.tf File:
- Change the credentials variable to match you .json file (downloaded from google cloud platform)

### 5. In Mgmt Environment:
- Run **cd gcpcloud** to be inside the gcpcloud directory
- Run **ssh-keygen -t rsa -b 2048**
- Run **terraform init**
- Run **terraform plan**
- Run **terraform apply**
- Run **sudo python3 getip.py** in order to populate gcphosts file and /etc/hosts with the IPs of all the instances
- Run **ansible targets -m ping** to check if mgmt node can reach all the other instances (not mandatory)
- And finally run **ansible-playbook setup-all-servers-playbook.yml** to setup, install and start all services. 

After all this steps the app should be running just fine in frontend_ip:3000, and to check if prometheus and grafana are correctly setup you can access monitor_ip:9090 and monitor_ip:3000, respectively. 

This should be what you get in your browser:

Prometheus
![](https://cdn.discordapp.com/attachments/1103041627200696431/1165310975788986419/image.png?ex=6546636b&is=6533ee6b&hm=ad587ef0e337e81637e587a54bde4a381c1a5efbd4553e67eb830e09d12a3f45&)

Grafana
The user and password for the authentication are admin and abc1234. They can be changed in the **setup-all-servers-playbook.yml** .
![](https://cdn.discordapp.com/attachments/1103041627200696431/1165311758936854578/image.png?ex=65466425&is=6533ef25&hm=6f9aeff340bea5aacbf5fec4f143ab89335633ba8d96b99d80a764fc84e1baeb&)




