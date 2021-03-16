let encrypt = {
	encodeHex: function(str){
		let buf = Buffer.from(str,'utf8');
		let encode = buf.toString('hex');
		return encode;
	},
	
	decodeHex: function(str){
		let buf = Buffer.from(str,'hex');
		let decode = buf.toString('utf8');
		return decode;
	},
	
	base64toUtf8:function(str){
		let b = Buffer.from(str,'base64');
		let html = b.toString('utf8');
		return html;
	},
	
	utf8toBase64: function(str){
		let b = Buffer.from(str,'utf8');
		let base64 = b.toString('base64');
		return base64;
	}
}

export {
	encrypt
}