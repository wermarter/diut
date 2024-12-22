# sudo visudo
# append to end of file: werma ALL=(ALL) NOPASSWD: ALL

sudo apt-add-repository ppa:ansible/ansible
sudo apt update && sudo apt upgrade -y
sudo apt install ansible ansible-lint

ssh-keygen -f ~/.ssh/labo2
ssh-keygen -f ~/.ssh/labo3
ssh-keygen -f ~/.ssh/labo4
ssh-keygen -f ~/.ssh/labo5

echo "
Host labo2
  HostName 10.1.1.97
  User werma
  Port 32
  IdentityFile ~/.ssh/labo2
  AddKeysToAgent yes
Host labo3
  User werma
  Port 957
  IdentityFile ~/.ssh/labo3
  AddKeysToAgent yes
Host labo4
  HostName 10.1.1.145
  User werma
  Port 9572
  IdentityFile ~/.ssh/labo4
  AddKeysToAgent yes
Host labo5
  HostName 10.1.1.185
  User werma
  Port 9573
  IdentityFile ~/.ssh/labo5
  AddKeysToAgent yes" > ~/.ssh/config

ssh-copy-id -i ~/.ssh/labo2.pub werma@labo2
ssh-copy-id -i ~/.ssh/labo3.pub werma@labo3
ssh-copy-id -i ~/.ssh/labo4.pub werma@labo4
ssh-copy-id -i ~/.ssh/labo5.pub werma@labo5

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
cd k3s-ansible && git checkout cb03ee829efc003844581cf6fbb2e04d57f3055e && cd ..

mkdir ./k3s-ansible/inventory/my-cluster/