
* deploy
```
SLS_DEBUG=* serverless deploy
```

* test self-invoke
```
serverless invoke --function=incTick --raw --data {\"cmd\":\"resettick\"}
```

* log
```
serverless logs -t -f incTick
```
