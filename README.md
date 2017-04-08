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
```
API
=====
详细使用请看 ./examples

### 标准分词 HanLP.Tokenizer( text )
	@param String text [文本]
	@ruten Object
```js
let words = HanLP.Tokenizer("商品和服务");

[
  { word: '商品', nature: 'n', offset: 0 },
  { word: '和', nature: 'cc', offset: 0 },
  { word: '服务', nature: 'vn', offset: 0 }
]
```
### NLP分词 HanLP.NLPTokenizer( text )
	@param String text [文本]
	@ruten Object
```js
let words = HanLP.NLPTokenizer("中国科学院计算技术研究所的宗成庆教授正在教授自然语言处理课程");

[
  { word: '中国科学院计算技术研究所', nature: 'nt', offset: 0 },
  { word: '的', nature: 'ude1', offset: 0 },
  { word: '宗成庆', nature: 'nr', offset: 0 },
  { word: '教授', nature: 'nnt', offset: 0 },
  ...
]
```
### 索引分词 HanLP.IndexTokenizer( text )
	@param String text [文本]
	@ruten Object
```js
let words = HanLP.IndexTokenizer("主副食品");

[
  { word: '主副食品', nature: 'n', offset: 0 },
  { word: '主副食', nature: 'j', offset: 0 },
  { word: '副食', nature: 'n', offset: 1 },
  { word: '副食品', nature: 'n', offset: 1 },
  { word: '食品', nature: 'n', offset: 2 }
]
```
### CRF分词 HanLP.CRFTokenizer( text )
	@param String text [文本]
	@ruten Object
```js
let words = HanLP.CRFTokenizer("你好，欢迎使用HanLP汉语处理包！");

[
  { word: '你好', nature: 'vl', offset: 0 },
  { word: '，', nature: 'w', offset: 0 },
  { word: '欢迎', nature: 'v', offset: 0 },
  { word: '使用', nature: 'v', offset: 0 },
  { word: 'HanLP', nature: 'nz', offset: 0 },
  { word: '汉语', nature: 'gi', offset: 0 },
  ...
]
```
### 最短路分词 HanLP.ShortSegment( text )
	@param String text [文本]
	@ruten Object
```js
let words = HanLP.ShortSegment("今天，刘志军案的关键人物,山西女商人丁书苗在市二中院出庭受审。");

[
  { word: '今天', nature: 't', offset: 0 },
  { word: '，', nature: 'w', offset: 0 },
  { word: '刘志军', nature: 'nr', offset: 0 },
  { word: '案', nature: 'ng', offset: 0 },
  { word: '的', nature: 'ude1', offset: 0 },
  { word: '关键', nature: 'n', offset: 0 },
  ...
]
```
### N-最短分词 HanLP.NShortSegment( text )
	@param String text [文本]
	@ruten Object
```js
let words = HanLP.NShortSegment("刘喜杰石国祥会见吴亚琴先进事迹报告团成员");

[
  { word: '刘喜杰', nature: 'nr', offset: 0 },
  { word: '石国祥', nature: 'nr', offset: 0 },
  { word: '会见', nature: 'v', offset: 0 },
  { word: '吴亚琴', nature: 'nr', offset: 0 },
  { word: '先进', nature: 'a', offset: 0 },
  ...
]
```
### 极速词典分词 HanLP.SpeedTokenizer( text )
	@param String text [文本]
	@ruten Object
```js
let words = HanLP.SpeedTokenizer("江西鄱阳湖干枯，中国最大淡水湖变成大草原");

[
  { word: '江西', offset: 0 },
  { word: '鄱阳湖', offset: 2 },
  { word: '干枯', offset: 5 },
  { word: '，', offset: 7 },
  { word: '中国', offset: 8 },
]
```
### 关键词提取 HanLP.Keyword( text , nTop )
	@param String text [文本]
	@param Number nTop [关键词个数，默认5个]
	@ruten Object
```js
let words = HanLP.Keyword("江西鄱阳湖干枯，中国最大淡水湖变成大草原" , 3);

[ '中国', '最大', '淡水湖' ]
```

### 短语提取 HanLP.Phrase( text , nTop )
	@param String text [文本]
	@param Number nTop [短语个数，默认3个]
	@ruten Object
```js
let words = HanLP.Phrase("江西鄱阳湖干枯，中国最大淡水湖变成大草原" , 2 );

[ '中国最大', '变成草原' ]
```
### 提取文章摘要 HanLP.Summary( text , nTop )
	@param String text [文本]
	@param Number nTop [文章摘要条数，默认3条]
	@ruten Object
```js
let text = "据美国福克斯新闻报道，俄罗斯黑海舰队一艘护卫舰格里戈罗维奇海军上将号，正在驶向美国军舰发射导弹攻击叙利亚的区域。该护卫舰是俄罗斯最先进的护卫舰，2016年才刚服役，除防空、反舰导弹外，也可以发射巡航导弹。格里戈罗维奇海军上将号原定于本周访问叙利亚的塔尔图斯港。";
let words = HanLP.Summary("text , 3);

[
  '俄罗斯黑海舰队一艘护卫舰格里戈罗维奇海军上将号',
  '格里戈罗维奇海军上将号原定于本周访问叙利亚的塔尔图斯港',
  '正在驶向美国军舰发射导弹攻击叙利亚的区域'
]
```
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

