/**
 * HanLP node版汉语言处理包
 * @authors chandre (chandre21cn@gmail.com)
 * @date    2017-11-06 18:24:04
 * @version 1.5.0
 */

const path 		= require("path");
const java 		= require("java");
const jarDir 		= path.resolve( __dirname , "./jar" );

java.options 		= [ '-Xms120m' , '-Xmx2014m', '-Xmn64m' ];
java.asyncOptions 	= {
	asyncSuffix: undefined,
  	syncSuffix: "Sync",  
	ifReadOnlySuffix: "_alt",
};

java.classpath.push( jarDir + "/hanlp.1.5.0.jar" );
java.classpath.push( jarDir + "/gson-2.2.2.jar" );

const HanLP 		= java.import('com.hankcs.hanlp.HanLP');
const Gson 		= java.newInstanceSync('com.google.gson.Gson');

module.exports = class HANLP {

	constructor( args ) {

		if (!args.proerties) {
			return new Error("proerties file path is undefined");
		}
		
		// 初始化配置
		HanLP.initSync(args.proerties);
		
		const opts = this.options = Object.assign({
			CustomDict : true, //使用自定义词典
			NameRecognize : true, //中国人名识别
			TranslatedNameRecognize : true , //音译人名识别
			JapaneseNameRecognize : true, //日本人名识别
			PlaceRecognize : true , //地名识别
			OrgRecognize : true //机构名识别
		}, args );

		const Tokenizer = java.import('com.hankcs.hanlp.tokenizer.StandardTokenizer');

		// 识别设置
		Tokenizer.SEGMENT.enableCustomDictionarySync( opts.CustomDict ) //使用自定义词典
			.enableNameRecognizeSync(opts.NameRecognize) //中国人名识别
			.enableTranslatedNameRecognizeSync(opts.TranslatedNameRecognize) //音译人名识别
			.enableJapaneseNameRecognizeSync(opts.JapaneseNameRecognize) //日本人名识别
			.enablePlaceRecognizeSync( opts.PlaceRecognize ) //地名识别
			.enableOrganizationRecognizeSync( opts.OrgRecognize ); //机构名识别
	}


	/**
	 * [Tokenizer 标准分词]
	 * @param {[String]} text [文本]
	 * @return JSON
	 */
	Tokenizer ( text ) {
		let StandardTokenizer = java.import('com.hankcs.hanlp.tokenizer.StandardTokenizer');
		let words = StandardTokenizer.segmentSync( text );
		return  JSON.parse( Gson.toJsonSync(words) );
	}

	/**
	 * [NLPTokenizer NLP分词]
	 * @param {[String]} text [文本]
	 * @return JSON
	 */
	NLPTokenizer ( text ) {
		let NLPTokenizer = java.import('com.hankcs.hanlp.tokenizer.NLPTokenizer');
		let words = NLPTokenizer.segmentSync( text );
		return  JSON.parse( Gson.toJsonSync(words) );
	}

	/**
	 * [IndexTokenizer 索引分词]
	 * @param {[String]} text [文本]
	 * @return JSON
	 */
	IndexTokenizer ( text ) {
		let IndexTokenizer = java.import('com.hankcs.hanlp.tokenizer.IndexTokenizer');
		let words = IndexTokenizer.segmentSync( text );
		return  JSON.parse( Gson.toJsonSync(words) );
	}

	
	/**
	 * [CRFTokenizer CRF分词]
	 * @param {[String]} text [文本]
	 * @return JSON
	 */
	CRFTokenizer ( text ) {
		let CRFSegment = java.newInstanceSync('com.hankcs.hanlp.seg.CRF.CRFSegment');
		let words = CRFSegment.segSync( text );
		return  JSON.parse( Gson.toJsonSync(words) );
	}

	/**
	 * [ShortSegment 最短路分词]
	 * @param {[String]} text [文本]
	 * @return JSON
	 */
	ShortSegment ( text ) {
		let opts = this.options,
			ShortSegment = java.newInstanceSync('com.hankcs.hanlp.seg.Dijkstra.DijkstraSegment');

		let words = ShortSegment.segSync( text );
		return  JSON.parse( Gson.toJsonSync(words) );
	}

	/**
	 * [NShortSegment N-最短分词]
	 * @param {[String]} text [文本]
	 * @return JSON
	 */
	NShortSegment ( text ) {
		let NShortSegment = java.newInstanceSync('com.hankcs.hanlp.seg.NShort.NShortSegment');
		let words = NShortSegment.segSync( text );
		return  JSON.parse( Gson.toJsonSync(words) );
	}

	/**
	 * [SpeedTokenizer 极速词典分词]
	 * @param {[String]} text [文本]
	 * @return JSON
	 */
	SpeedTokenizer ( text ) {
		let SpeedTokenizer = java.import('com.hankcs.hanlp.tokenizer.SpeedTokenizer');
		let words = SpeedTokenizer.segmentSync( text );
		return  JSON.parse( Gson.toJsonSync(words) );
	}

	/**
	 * [NoStopWord 去除停用词分词]
	 * @param {[String]} text [文本]
	 * @return JSON
	 */
	NoStopWord ( text ) {
		let opts = this.options,
			Tokenizer = java.import('com.hankcs.hanlp.tokenizer.StandardTokenizer'),
			StopWordDict = java.import('com.hankcs.hanlp.dictionary.stopword.CoreStopWordDictionary');
		let words = Tokenizer.segmentSync( text );
		StopWordDict.applySync( words );
		return  JSON.parse( Gson.toJsonSync(words) );
	}

	/**
	 * [Keyword 关键词提取]
	 * @param {[String]} text [文本]
	 * @param {[Number]} Ntop [关键词个数，默认5个]
	 * @return JSON
	 */
	Keyword ( text , Ntop ) {
		let words = HanLP.extractKeywordSync( text , Ntop || 5 );
		return  JSON.parse( Gson.toJsonSync(words) );
	}

	/**
	 * [Phrase 短语提取]
	 * @param {[String]} text [文本]
	 * @param {[Number]} Ntop [短语个数，默认3个]
	 * @return JSON
	 */
	Phrase ( text , Ntop ) {
		let words = HanLP.extractPhraseSync( text , Ntop || 3 );
		return  JSON.parse( Gson.toJsonSync(words) );
	}

	/**
	 * [Summary 提取文章摘要]
	 * @param {[String]} text [文本]
	 * @param {[Number]} Ntop [文章摘要个数，默认3个]
	 * @return JSON
	 */
	Summary ( text , Ntop ) {
		let words = HanLP.extractSummarySync( text , Ntop || 3 );
		return  JSON.parse( Gson.toJsonSync(words) );
	}

	/**
	 * [ Suggester 文本推荐(句子级别，从一系列句子中挑出与输入句子最相似的那一个)]
	 * @param {[Array]} list  [句子列表]
	 * @param {[Array]} words [词语]
	 * @param {[Number]} Ntop [相似句子个数，默认1个]
	 * @return JSON
	 */
	Suggester ( list, words,  Ntop ) {
		let Suggester = java.newInstanceSync('com.hankcs.hanlp.suggest.Suggester');
		list = Array.isArray( list ) ? list : new Array( list );
		words = Array.isArray( words ) ? words : new Array( words );

		list.forEach( ( item , i ) => {
			Suggester.addSentenceSync( item );
		});

		let data = [];
		words.forEach( (item , i)=> {
			data[i] = {
				word : item,
				value : JSON.parse( Gson.toJsonSync( Suggester.suggestSync( item , Ntop || 1 ) ) ),
			};
		});
		return data;
	}

	/**
	 * [WordDistance 语义距离]
	 * @param {[Array]} text [词]
	 * @return JSON
	 */
	WordDistance ( words ) {
		words = Array.isArray( words ) ? words : new Array( words );
		let data  = [],
			SynonymDictionary = java.newInstanceSync('com.hankcs.hanlp.dictionary.CoreSynonymDictionary');

		words.forEach( ( wordA , i ) => {
			let tmp = [];
			words.forEach( ( wordB , index ) => {
				tmp[index] = JSON.parse( Gson.toJsonSync( SynonymDictionary.distanceSync( wordA , wordB ) ) )
			});
			data[i]= {
				word : wordA,
				value : tmp
			};
		});

		return data
	}

	/**
	 * [ConversionFont 简繁转换]
	 * @param {[type]} text [文本]
	 * @param {[type]} type [类型 jt简体|ft繁体  默认jt ]
	 */
	ConversionFont ( text , type ) {
		type = type || "jt"
		if ( type.toLowerCase() === "ft" ) {
			return HanLP.convertToTraditionalChineseSync( text );
		} else {
			return HanLP.convertToSimplifiedChineseSync( text );
		}
	}

	/**
	 * [Pinyin 拼音转换]
	 * @param {[type]} text [文本]
	 * @param {[type]} type [类型 num数字音调|tone符号音调|outtone无音调|shengmu声母|yunmu韵母|head输入法头  默认outtone ]
	 */
	Pinyin ( text , type ) {
		type = type || "jt"
		let PinYin = HanLP.convertToPinyinListSync( text ).toArraySync();
		type = type.toLowerCase();

		return PinYin.map( (item , i ) => {
			switch (type) {
				case "num":
					return item.toStringSync();
					break;
				case "shengmu":
					return item.getShengmuSync().toStringSync();
					break;
				case "yunmu":
					return item.getYunmuSync().toStringSync();
					break;
				case "head":
					return item.getHeadSync().toStringSync();
					break;
				case "tone":
					return item.getPinyinWithToneMarkSync();
				case "outtone":
				default : 
					return item.getPinyinWithoutToneSync();
			}
		})
	}
}