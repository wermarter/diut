cp -R ./k3s-ansible-config/* ./k3s-ansible/inventory/my-cluster/

ansible-playbook ./k3s-ansible/site.yml -i ./k3s-ansible/inventory/my-cluster/hosts.ini
mv ./k3s-ansible/kubeconfig ~/.kube/config

kubectl=/snap/bin/kubectl

$kubectl create ns argo
$kubectl create ns observability
$kubectl create ns longhorn-system
$kubectl create ns envoy-gateway-system
$kubectl create ns infra
$kubectl create ns hcdc
