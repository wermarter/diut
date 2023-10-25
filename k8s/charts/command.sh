# fetch tgz file into ./charts after declaring dependencies in Chart.yaml
helm dependency update

# manual install a Helm chart
helm install diut-minio ./minio -n diut

# uninstall a Helm chart
helm uninstall diut-minio