export default function (plop) {
    plop.setGenerator('component', {
        description: 'Create a component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Nome do componente:'
            },
            {
                type: 'confirm',
                name: 'useProps',
                message: 'Vai usar type para as propriedades do componente?'
            },
        ],
        actions: [
            {
                type: 'add',
								path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
                templateFile: 'templates/components/index.tsx.hbs'
            },
            {
                type: 'add',
                path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
                templateFile: 'templates/components/stories.stories.tsx.hbs'
            },
            {
                type: 'add',
								path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.styles.ts',
                templateFile: 'templates/components/styles.ts.hbs'
            },
            {
                type: 'add',
                path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.spec.tsx',
                templateFile: 'templates/components/test.spec.tsx.hbs'
            },
            {
                type: 'add',
								path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.types.ts',
                templateFile: 'templates/components/types.ts.hbs'
            }
        ]
    });
};
