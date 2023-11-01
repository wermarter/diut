echo -n 'admin' > ./admin-user
echo -n 'admin' > ./admin-password

kubectl create ns observability
kubectl -n observability create secret generic grafana-admin-credentials --from-file=./admin-user --from-file=admin-password 