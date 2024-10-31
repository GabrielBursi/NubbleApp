export default function (plop) {
    plop.setGenerator('hook', {
        description: 'Create a hook',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Nome do hook (sem o prefixo "use"):',
            },
        ],
        actions: [
            {
                type: 'add',
                path: '../src/hooks/use{{pascalCase name}}/use{{pascalCase name}}.tsx',
                templateFile: 'templates/hooks/index.tsx.hbs',
            },
            {
                type: 'add',
                path: '../src/hooks/use{{pascalCase name}}/use{{pascalCase name}}.test.tsx',
                templateFile: 'templates/hooks/test.tsx.hbs',
            },
        ],
    })
}
