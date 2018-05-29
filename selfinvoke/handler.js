'use strict';
const aws = require('aws-sdk')
let lambda = new aws.Lambda({ maxRetries: 0 })

let counter = 0
let tick = 0

let invokeFunc= (funcName,args) => {
    let currfn = process.env['AWS_LAMBDA_FUNCTION_NAME']
    let params = {
      FunctionName: currfn.replace(/([^-]+)$/, funcName)
    }
    if (args){
      params.InvokeArgs = JSON.stringify(args)
    }
    return lambda.invokeAsync(params)
      .promise()
      .then((res) => {
        try {
          //console.log('res=', res); //return JSON.parse(res.Payload)
        } catch (ex) {
          console.error(`Error parsing lambda execution payload:\n${res.Payload}\nCaused error:\n${ex.stack}`)
          return undefined // ignore error
        }
      })
      .catch((ex) => {
        console.error('Error invoking self:')
        console.error(ex.stack)
        return Promise.reject(new Error(`ERROR invoking self: ${ex.message}`))
      })
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout( () => resolve(), ms);
  })
}

let incTick = async (argstr) => {
    console.log('argstr=', argstr)
    console.log(`incTick: tick=${tick}`)
    if (argstr){
      let args = JSON.parse(argstr)
      if( args.cmd=='resettick'){
        tick=0
        console.log('reset tick to 0')
      }
    }
    tick+=1
    if ( tick <10){
      await sleep(1000)
      let ret = await invokeFunc('incTick', JSON.stringify({ tick:tick}))
      console.log('ret=', ret)
    }
}

module.exports.incTick = incTick
module.exports.helloWorld = async (event, context, callback) => {
  counter+=1
  console.log("event=",event)
  console.log("callbackWaitsForEmptyEventLoop=", context.callbackWaitsForEmptyEventLoop)
  const params= event.queryStringParameters
  if ( params && params.cmd=='resettick'){
    await invokeFunc('incTick', JSON.stringify({ cmd:'resettick'}))
  }
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: `Serverless! counter=${counter} tick=${tick}`,
      input: event,
    }),
  };
  callback(null, response);
};
