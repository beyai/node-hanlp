const _ 		= require("underscore");
const express 	= require('express');
const Hanlp 	= require("./lib/index");

const router 	= express.Router();
const HanLP 	= new Hanlp();



// 路由中间件
router.use(function(req, res, next) {
	if (req.method==="GET") return next();
	let param = req.body;
	if ( !_.has( param , "content" ) || _.isEmpty( param["content"] ) ) {
		return res.status(500).send({
			status : "error",
			msg : "请求失败！"
		})
	};
	next();
});

// 分词
router.post("/tokenizer", ( req , res ) => {
	let param = req.body,
		words = null,
		type  = _.isEmpty(param.type) ? "standard" : param.type;

	type = type.toLowerCase();
	switch (type) {
		case "crf" : //CRF分词
			words = HanLP.CRFTokenizer( param.content );
			break;
		case "nostopword" : //去除停用词分词
			words = HanLP.NoStopWord( param.content );
			break;
		case "nlp" : //NLP分词
			words = HanLP.NLPTokenizer( param.content );
			break;
		case "index" : //索引分词
			words = HanLP.IndexTokenizer( param.content );
			break;
		case "short" : //最短路分词
			words = HanLP.ShortSegment( param.content );
			break;
		case "nshort" : //N-最短分词
			words = HanLP.NShortSegment( param.content );
			break;
		case "speed" : //极速词典分词
			words = HanLP.SpeedTokenizer( param.content );
			break;
		case "standard" : //标准分词
		default:
			words = HanLP.Tokenizer( param.content );
	}
	res.send({
		status : "success",
		data : words
	});
})

// 关键词
router.post("/keyword", ( req , res ) => {
	let param = req.body,
		num = _.isEmpty(param.num) || _.isNaN( parseInt(param.num) ) ? 3 : parseInt(param.num),
		words = HanLP.Keyword( param.content , num );
	res.send({
		status : "success",
		data : words
	});
})

// 摘要
router.post("/summary", ( req , res ) => {
	let param = req.body,
		num = _.isEmpty(param.num) || _.isNaN( parseInt(param.num) ) ? 3 : parseInt(param.num),
		words = HanLP.Summary( param.content , num );
	res.send({
		status : "success",
		data : words
	});
})

// 短语提取
router.post("/phrase", ( req , res ) => {
	let param = req.body,
		num = _.isEmpty(param.num) || _.isNaN( parseInt(param.num) ) ? 3 : parseInt(param.num),
		words = HanLP.Phrase( param.content , num );
	res.send({
		status : "success",
		data : words
	});
});

// 关键词、摘要
router.post("/query", ( req , res ) => {
	let param = req.body;
	let num = _.isEmpty(param.num) || _.isNaN( parseInt(param.num) ) ? 3 : parseInt(param.num) ;
	res.send({
		status : "success",
		data : {
			keyword : HanLP.Keyword( param.content , num ),
			summary : HanLP.Summary( param.content , num ),
		}
	})
})

// 简、繁、拼音转换
router.post("/conversion" , (req , res ) => {
	let param = req.body,
		data = null,
		type  = _.isEmpty(param.type) ? "py" : param.type;
	type = type.toLowerCase();
	switch (type) {
		case "ft" : //繁体
			data = HanLP.ConversionFont( param.content , "ft" );
			break;
		case "jt" : //简体
			data = HanLP.ConversionFont( param.content , "jt"  );
			break;
		case "py" : //拼音转换
		default:
			data = HanLP.Pinyin( param.content , "outtone" );
	}
	res.send({
		status : "success",
		data : data
	})
})

module.exports = router;