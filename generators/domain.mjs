export default function (plop) {
	plop.setGenerator('domain', {
		description: 'Create a domain',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Nome do domain:'
			},
		],
		actions: [
			{
				type: 'add',
				path: '../src/domain/{{pascalCase name}}/index.ts',
				templateFile: 'templates/domain/index.ts.hbs'
			},
			{
				type: 'add',
				path: '../src/domain/{{pascalCase name}}/api/index.ts',
				templateFile: 'templates/domain/apiIndex.ts.hbs'
			},
			{
				type: 'add',
				path: '../src/domain/{{pascalCase name}}/models/index.ts',
				templateFile: 'templates/domain/modelIndex.ts.hbs'
			},
			{
				type: 'add',
				path: '../src/domain/{{pascalCase name}}/models/{{pascalCase name}}.ts',
				templateFile: 'templates/domain/model.ts.hbs'
			},
			{
				type: 'add',
				path: '../src/domain/{{pascalCase name}}/models/{{pascalCase name}}Api.ts',
				templateFile: 'templates/domain/modelApi.ts.hbs'
			},
			{
				type: 'add',
				path: '../src/domain/{{pascalCase name}}/useCases/index.ts',
			},
		]
	});
};
