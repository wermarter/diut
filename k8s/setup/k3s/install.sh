curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--https-listen-port=6443 --disable=servicelb" INSTALL_K3S_VERSION=v1.28.2+k3s1 sh -s
sudo cat /etc/rancher/k3s/k3s.yaml > /home/chienha/.kube/config