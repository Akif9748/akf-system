# akf-system
A Node.js based sync system-information (GPU, RAM, etc.) fetcher. Zero dependencies.

## Usage
JS usage:
```js
const information = require("akf-system");
console.log(information());
/*
{
  Username: 'Akif9748',
  Host: 'G41MT-S2PT',
  OS: 'Windows 10 Pro x64',
  Build: '10.0.19045',
  Uptime: '2 Days, 1 Hours, 37 Mins, 41 Secs',
  CPU: 'Intel(R) Core(TM)2 Quad  CPU   Q8200  @ 2.33GHz',
  RAM: '2781MB / 4094MB (67%)',
  GPUS: [ 'AMD Radeon HD 6670' ],
  Motherboard: 'Gigabyte Technology Co., Ltd.  G41MT-S2PT',
  Resolution: '1280x1024'
}
*/

```
You can install it globally with `npm i -g akf-system` and use with `asys`. Or you can use it without install, via `npx akf-system`. Or run it directly, via `npm test`.

## Benchmark:
~500ms on this system. You can check with `npm test`.

![image](https://user-images.githubusercontent.com/70021050/152860251-34f76403-82f7-4885-b859-0707048bfd6b.png)