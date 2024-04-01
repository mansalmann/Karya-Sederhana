const url = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '10e42692eemshbea4a5f72d8f4f9p184365jsndd748de90554',
		'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
	},
	body: {
		messages: [
			{
				role: 'user',
				content: 'hello'
			}
		],
		system_prompt: '',
		temperature: 0.9,
		top_k: 5,
		top_p: 0.9,
		max_tokens: 256,
		web_access: false
	}
};

try {
	const response = fetch(url, options);
	const result = response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}