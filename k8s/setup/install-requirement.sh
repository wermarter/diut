# sudo visudo
# append to end of file: labo2 ALL=(ALL) NOPASSWD: ALL

sudo apt-add-repository ppa:ansible/ansible
sudo apt update && sudo apt upgrade -y
sudo apt install ansible ansible-lint

ssh-keygen -f ~/.ssh/localhost
ssh-copy-id -i ~/.ssh/localhost.pub labo2@localhost

echo "Host localhost
  User labo2
  Port 32
  IdentityFile ~/.ssh/localhost
  AddKeysToAgent yes" >> ~/.ssh/config
ssh localhost

ansible-playbook playbooks/prepare-k3s.yaml

sudo snap install kubectl --classic
sudo snap install helm --classic