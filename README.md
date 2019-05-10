# ddns-aliyun

Automatically resolve native IP to AliYun DNS record.

## Prepare something

1. Add your own accessKeyId and accessKeySecret to './config/client.js', you can find these on your AliYun console.
2. Modify './config/domain.js' to your own domain infomation.
3. I use 'http://pv.sohu.com/cityjson?ie=utf-8' to get native ip. If you do not like this, too slow or not working. You can mydify that in 'lib.js' getNowIp function. After all, this is free and unstable, so I suggest you deploy your own IP API.

## Getting started

· Quick start

```bash
git clone https://github.com/zzzue/ddns-aliyun.git
cd ddns-aliyun
npm i
node index.js
```

· For long-term operation

```bash
npm i pm2 -g
pm2 start index.js
```

## LICENSE

[MIT](http://opensource.org/licenses/MIT)
