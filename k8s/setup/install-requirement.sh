# sudo visudo
# append to end of file: werma ALL=(ALL) NOPASSWD: ALL

sudo apt-add-repository ppa:ansible/ansible
sudo apt update && sudo apt upgrade -y
sudo apt install ansible ansible-lint

# Passwordless SSH + passwordless sudo
ssh labo2
ssh labo3
ssh labo4
ssh labo5

ansible-playbook playbooks/shell.yaml
ansible-playbook playbooks/prepare-k3s.yaml
ansible-playbook playbooks/prepare-longhorn.yaml

sudo snap install kubectl --classic
sudo snap install helm --classic

git clone https://github.com/techno-tim/k3s-ansible
cd k3s-ansible && git checkout v1.30.2+k3s2+tt1 && cd ..

mkdir ./k3s-ansible/inventory/my-cluster/