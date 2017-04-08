HanLP for nodejs
=====

### 环境要求
    java 1.8
	nodejs >= 6

### 安装
	npm install

### 词典文件目录
    ./data
    词典下载地址 **[https://pan.baidu.com/s/1pKUVNYF](https://pan.baidu.com/s/1pKUVNYF)**

### 使用

```js
	const Hanlp = require("../lib/index");
	const HanLP = new Hanlp({
		CustomDict : false, //使用自定义词典
		NameRecognize : true, //中国人名识别
		TranslatedNameRecognize : true , //音译人名识别
		JapaneseNameRecognize : true, //日本人名识别
		PlaceRecognize : true , //地名识别
		OrgRecognize : true //机构名识别
	});
	
	let words = HanLP.Tokenizer("商品和服务");
```
### API

