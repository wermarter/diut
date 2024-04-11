# sudo visudo
# append to end of file: labo2 ALL=(ALL) NOPASSWD: ALL

sudo apt-add-repository ppa:ansible/ansible
sudo apt update && sudo apt upgrade -y
sudo apt install ansible ansible-lint

ssh-keygen -f ~/.ssh/labo3
ssh-copy-id -i ~/.ssh/labo3.pub werma@labo3

echo "Host labo3
  User werma
  Port 957
  IdentityFile ~/.ssh/labo3
  AddKeysToAgent yes" >> ~/.ssh/config
ssh labo3

ansible-playbook playbooks/prepare-k3s.yaml

sudo snap install kubectl --classic
sudo snap install helm --classic