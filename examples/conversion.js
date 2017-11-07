/**
 * 文本信息提取
 * @authors chandre (chandre21cn@gmail.com)
 * @date    2017-04-08 18:24:04
 * @version 1.0.0
 */


const Hanlp = require("../lib/index");
const path 	= require("path");
const HanLP = new Hanlp({
	proerties : path.resolve( __dirname , "../hanlp.properties")
});

// [ConversionFont 简繁转换]
console.log("\n============================= 繁体 =============================")
var text  = "用笔记本电脑写程序";
var txt = HanLP.ConversionFont( text , "ft" );
console.log( `${text} >>>> ${txt}` )

console.log("\n============================= 简体 =============================")
var text  = "「以後等妳當上皇后，就能買士多啤梨慶祝了」";
var txt = HanLP.ConversionFont( text );
console.log( `${text} >>>> ${txt}` )


// [Pinyin 拼音转换]
console.log("\n============================= 拼音转换 =============================")
var text  = "用笔记本电脑写程序";
['num','tone','outtone','shengmu','yunmu','head'].forEach(function(item){
	var txt = HanLP.Pinyin( text , item );
	console.log( `${item} >>>> ${txt}` )
})
