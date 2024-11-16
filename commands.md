# Ecr commands
```
docker tag nest-crud-app:latest 218276923349.dkr.ecr.us-east-1.amazonaws.com/nest-crud-app/rest-api
kubectl apply -f deployment-local.yaml
kubectl delete --all deployments
kubectl create -f configmap.yaml
kubectl logs deployment/nest-crud-api
kubectl create -f secrets/secret.yaml
aws eks update-kubeconfig --region us-east-1 --name web-quickstart

```
