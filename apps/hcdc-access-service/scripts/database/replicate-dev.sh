rm -f hcdc.bak
mongodump --uri="mongodb://root:conculan@mongodb-0.mongodb-headless.infra.svc.cluster.local:27017,mongodb-1.mongodb-headless.infra.svc.cluster.local:27017,mongodb-2.mongodb-headless.infra.svc.cluster.local:27017/?retryWrites=true&loadBalanced=false&replicaSet=rs0&readPreference=primary&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256" --archive="hcdc.bak" --db=hcdc
mongorestore --uri="mongodb://root:conculan@mongodb-0.mongodb-headless.infra.svc.cluster.local:27017,mongodb-1.mongodb-headless.infra.svc.cluster.local:27017,mongodb-2.mongodb-headless.infra.svc.cluster.local:27017/?retryWrites=true&loadBalanced=false&replicaSet=rs0&readPreference=primary&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256" --archive="hcdc.bak" --nsFrom="hcdc.*" --nsTo="hcdc-dev.*"
rm hcdc.bak