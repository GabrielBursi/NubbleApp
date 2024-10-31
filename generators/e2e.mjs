export default function (plop) {
	plop.setGenerator('screen', {
		description: 'Create a describe block for e2e',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Nome do teste:'
			},
		],
		actions: [
			{
				type: 'add',
				path: '../e2e/tests/{{pascalCase name}}.spec.ts',
				templateFile: 'templates/e2e/index.spec.ts.hbs'
			},
		]
	});
};
