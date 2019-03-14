eval $( aws ecr get-login --no-include-email )
docker build -t qgen .
docker tag blockument 293065333722.dkr.ecr.us-east-1.amazonaws.com/qgen
docker push 293065333722.dkr.ecr.us-east-1.amazonaws.com/qgen
aws ecs update-service --cluster hashsignals --service qgen --force-new-deployment
