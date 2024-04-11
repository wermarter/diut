helm upgrade --install -n observability prometheus-stack . --render-subchart-notes

# helm uninstall -n observability prometheus-stack