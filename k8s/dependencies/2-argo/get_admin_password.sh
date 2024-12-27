kubectl=/snap/bin/kubectl

$kubectl -n argo get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d