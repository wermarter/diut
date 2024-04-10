kubectl=/snap/bin/kubectl

$kubectl -n core get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d