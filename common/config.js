//初始化云服务空间
const mpWeb = uniCloud.init({
	provider: 'aliyun',
	spaceId: 'a94141e1-1a0f-4611-b1dc-3a51899f79f8',
	clientSecret: '1Lg5SBUZnNNd+dpo7cOqAw=='
});

export {mpWeb}
