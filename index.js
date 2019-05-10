const lib = require('./lib.js')
const domain = require('./config/domain.js')
const schedule = require('node-schedule')
const cronStr = '*/10 * * * *' //Execute every ten minutes
const main = async () => {
  console.log('Run started:' + new Date())
  let nowIp = await lib.getNowIp()
  console.log('Now IP:' + nowIp)
  for (index in domain.RRs) {
    lib.handleRecord(domain.gTLD, domain.RRs[index], nowIp)
  }
  schedule.scheduleJob(cronStr, async () => {
    console.log('Run at:' + new Date())
    nowIp = await lib.getNowIp()
    console.log('Now IP:' + nowIp)
    for (index in domain.RRs) {
      lib.handleRecord(domain.gTLD, domain.RRs[index], nowIp)
    }
  })
}
main()