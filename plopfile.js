module.exports = function (plop) {
    plop.setGenerator('component', {
      description: 'Create a new Vue component with specific folder structure',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'Component name?',
        },
      ],
      actions: [
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.vue',
          templateFile: 'plop-templates/component.vue',
        },
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.html',
          templateFile: 'plop-templates/component.html',
        },
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.ts',
          templateFile: 'plop-templates/component.ts',
        },
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.css',
          templateFile: 'plop-templates/component.css',
        },
      ],
    });
  };