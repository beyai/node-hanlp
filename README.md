HanLP for nodejs
=====

### 环境要求
java 1.8
nodejs >= 6

### 安装
npm install

### 词典文件目录
./data
词典下载地址 (https://pan.baidu.com/s/1pKUVNYF)

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
console.log(words)
```
API
=====
### 标准分词 HanLP.Tokenizer( text )
	@param String text [文本]
	@ruten Object

### NLP分词 HanLP.NLPTokenizer( text )
	@param String text [文本]
	@ruten Object

### 索引分词 HanLP.IndexTokenizer( text )
	@param String text [文本]
	@ruten Object

### CRF分词 HanLP.CRFTokenizer( text )
	@param String text [文本]
	@ruten Object

### 最短路分词 HanLP.ShortSegment( text )
	@param String text [文本]
	@ruten Object

### N-最短分词 HanLP.NShortSegment( text )
	@param String text [文本]
	@ruten Object

### 极速词典分词 HanLP.SpeedTokenizer( text )
	@param String text [文本]
	@ruten Object

### 关键词提取 HanLP.Keyword( text , nTop )
	@param String text [文本]
	@param Number nTop [关键词个数，默认5个]
	@ruten Object

### 短语提取 HanLP.Phrase( text , nTop )
	@param String text [文本]
	@param Number nTop [短语个数，默认3个]
	@ruten Object

### 提取文章摘要 HanLP.Summary( text , nTop )
	@param String text [文本]
	@param Number nTop [文章摘要条数，默认3条]
	@ruten Object

### 文本推荐 HanLP.Suggester( list, words,  Ntop )
	@param Array list 	句子列表
	@param Array words 词语
	@param Number nTop 相似句子推荐个数，默认1个
	@ruten Object

	句子级别，从一系列句子中挑出与输入句子最相似的那一个

### 语义距离 HanLP.WordDistance( words )
	@param Array words 	词
	@ruten Object

### 简繁转换 HanLP.ConversionFont( text , type )
	@param String text 文本
	@ruten String type 类型 jt简体|ft繁体，默认jt
	@ruten String

### 拼音转换 HanLP.Pinyin( text , type )
	@param String text 文本
	@ruten String type 类型 类型 num数字音调|tone符号音调|outtone无音调|shengmu声母|yunmu韵母|head输入法头，默认outtone 
	@ruten Object

