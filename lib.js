const Core = require('@alicloud/pop-core')
const axios = require('axios')
const clientConfig = require('./config/client.js')
const client = new Core(clientConfig)

const getNowIp = async () => {
  let nowIp = false
  await axios
    .get('http://pv.sohu.com/cityjson?ie=utf-8')
    .then(response => {
      eval(response.data)
      nowIp = returnCitySN.cip
    })
    .catch(error => {
      console.log(error)
    })
  return nowIp
}
const describeRecord = async (gTLD, RR) => {
  let recordExists = false
  let record = {}
  const params = {
    "DomainName": gTLD,
    "RRKeyWord": RR
  }
  const requestOption = {
    method: 'POST'
  }
  await client
    .request('DescribeDomainRecords', params, requestOption)
    .then(result => {
      const records = result.DomainRecords.Record
      for (let index in records) {
        if (records[index].RR == RR) {
          recordExists = true
          record = records[index]
        }
      }
    }, ex => {
      console.log(ex)
    })
  return {
    recordExists,
    record
  }
}
const addRecord = async (gTLD, RR, IP) => {
  const params = {
    "DomainName": gTLD,
    "RR": RR,
    "TTL": 600,
    "Value": IP,
    "Type": "A"
  }
  const requestOption = {
    method: 'POST'
  }
  await client.request('AddDomainRecord', params, requestOption).then(result => {
    console.log(result)
    console.log(`A DNS record with a value of ${RR} for ${gTLD} has been added.`)
  }, ex => {
    console.log(ex)
  })
}
const updateRecord = async (RecordId, RR, IP, gTLD) => {
  const params = {
    "RecordId": RecordId,
    "RR": RR,
    "Type": "A",
    "Value": IP,
    "TTL": 600
  }
  const requestOption = {
    method: 'POST'
  }
  await client.request('UpdateDomainRecord', params, requestOption).then(result => {
    console.log(result)
    console.log(`A DNS record with a value of ${RR} for ${gTLD} has been updated to ${IP}.`)
  }, ex => {
    console.log(ex)
  })
}
const handleRecord = async (gTLD, RR, IP) => {
  let describe = await describeRecord(gTLD, RR)
  if (!describe.recordExists) {
    addRecord(gTLD, RR, IP)
  } else {
    if (describe.record.Value !== IP) {
      updateRecord(describe.record.RecordId, RR, IP, gTLD)
    } else {
      console.log(`The DNS record with a value of  ${RR} for ${gTLD} has not changed.`)
    }
  }
}
module.exports = {
  getNowIp,
  describeRecord,
  addRecord,
  updateRecord,
  handleRecord
}