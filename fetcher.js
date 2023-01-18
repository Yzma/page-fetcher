
const fs = require('fs')
const request = require('request')

const args = process.argv.slice(2)
if (args.length <= 1) {
  return
}

request(args[0], (error, response, body) => {
  if (error) {
    console.log('Error: ', error)
    return
  }

  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode}. Response: ${body}`
    console.log('Error: ', msg)
    return
  }

  fs.writeFile(args[1], body, err => {
    if (err) {
      console.error(err)
      return
    }
    
    console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}`)
  })
})