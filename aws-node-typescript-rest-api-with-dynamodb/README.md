# Introduction

TypeScript (ts) offers type safety which is helpful when working with the AWS SDK, which comes with ts definitions (d.ts)

# watch build
```
npm run watch
```

# deploy
```
sls deploy
```

# test
```
curl -d '{"text":"bingo3"}' -H "Content-Type: application/json" -X POST https://b1y6pmdx9l.execute-api.us-east-1.amazonaws.com/dev/todos
```

# log
```
sls logs -t -f create
```
