function getCoffee() {
  return new Promise(resolve => {
    setTimeout(() => resolve('☕'), 2000); // it takes 2 seconds to make coffee
  });
}

async function wow() {
  console.log( 'a=', await getCoffee())
  console.log( 'b=', await getCoffee())
  console.log( 'c=', await getCoffee())
}

wow()
