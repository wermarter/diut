echo -n 'admin' > ./admin-user # change your username
echo -n 'admin' > ./admin-password # change your password

kubectl create ns observability
kubectl create secret generic grafana-admin-credentials --from-file=./admin-user --from-file=admin-password -n observability