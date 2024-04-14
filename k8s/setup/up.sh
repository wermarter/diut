cp -R ./k3s-ansible-config/* ./k3s-ansible/inventory/my-cluster/

ansible-playbook ./k3s-ansible/site.yml -i ./k3s-ansible/inventory/my-cluster/hosts.ini
mv ./k3s-ansible/kubeconfig ~/.kube/config