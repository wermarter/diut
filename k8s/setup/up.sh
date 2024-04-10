git clone https://github.com/techno-tim/k3s-ansible
cd k3s-ansible && git checkout cb03ee829efc003844581cf6fbb2e04d57f3055e && cd ..

mkdir ./k3s-ansible/inventory/my-cluster/
cp -R ./k3s-ansible-config/* ./k3s-ansible/inventory/my-cluster/

ansible-playbook ./k3s-ansible/site.yml -i ./k3s-ansible/inventory/my-cluster/hosts.ini
mv ./k3s-ansible/kubeconfig ~/.kube/config