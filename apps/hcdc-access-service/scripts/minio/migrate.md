bash +o history
mc alias set destminio http://minio.diut.svc.cluster.local:9000 <minioadminuser> <minioadminpassword>
mc alias set srcminio http://localhost:9000 minioadmin minioadmin
bash -o history

mc admin info destminio
mc admin info srcminio
mc mirror srcminio/bathanghai-result-image destminio/
