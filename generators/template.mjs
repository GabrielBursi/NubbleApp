export default function (plop) {
	plop.setGenerator('screen', {
		description: 'Create a screen',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Nome do template:'
			},
			{
				type: 'confirm',
				name: 'useProps',
				message: 'Vai usar type para as propriedades do template?'
			},
		],
		actions: [
			{
				type: 'add',
				path: '../src/templates/{{pascalCase name}}//{{pascalCase name}}.tsx',
				templateFile: 'templates/template/index.tsx.hbs'
			},
			{
				type: 'add',
				path: '../src/templates/{{pascalCase name}}//{{pascalCase name}}.styles.ts',
				templateFile: 'templates/template/styles.ts.hbs'
			},
			{
				type: 'add',
				path: '../src/templates/{{pascalCase name}}//{{pascalCase name}}.types.ts',
				templateFile: 'templates/template/types.ts.hbs'
			}
		]
	});
};
