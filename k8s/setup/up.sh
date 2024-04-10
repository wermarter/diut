git clone https://github.com/techno-tim/k3s-ansible

mkdir ./k3s-ansible/inventory/my-cluster/
cp -R ./k3s-ansible-config/* ./k3s-ansible/inventory/my-cluster/

ansible-playbook ./k3s-ansible/site.yml -i ./k3s-ansible/inventory/my-cluster/hosts.ini