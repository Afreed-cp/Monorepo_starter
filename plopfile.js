module.exports = function (plop) {
    // Custom kebabCase function
    const kebabCase = str => str
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/([a-z])([A-Z])/g, '$1-$2') // Add - between camelCase
      .replace(/-+/g, '-') // Replace multiple - with single -
      .toLowerCase(); // Convert to lowercase
  
    // Set the tagname partial to use a standardized prefix
    plop.setPartial('tagnamePartial', '{{dashCase name}}');
  
    // Helper for generating the class name based on the component name
    plop.setHelper('className', function (name) {
      const camel = name.replace(/-([a-z])/g, g => g[1].toUpperCase());
      return `ThemeEngine${camel.charAt(0).toUpperCase() + camel.slice(1)}Element`;
    });
  
    // Helper for setting the version of theme-engine-base in generated files
    plop.setHelper('themeEngineBaseVersion', function () {
      const basePackageJson = require('./packages/theme-engine-base/package.json');
      return basePackageJson.version;
    });
  
    // Helper to format the display name for Storybook and documentation
    plop.setHelper('displayName', function (name) {
      const spaced = name.replace(/-([a-z])/g, g => ` ${g[1].toUpperCase()}`);
      return spaced.charAt(0).toUpperCase() + spaced.slice(1);
    });
  
    // Generator for creating a new package
    plop.setGenerator('new-package', {
      description: 'Generate a new component package',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'Component name (e.g., "button"):',
          validate: answer => answer.length > 0 ? true : 'Please enter a component name.',
          filter: response => kebabCase(response.replace(/^theme-engine-/, '')),
        },
      ],
      actions: [
        // Core package files
        {
          type: 'add',
          path: 'packages/{{> tagnamePartial }}/lib/index.ts',
          templateFile: 'plop-templates/index.ts.hbs',
        },
        {
          type: 'add',
          path: 'packages/{{> tagnamePartial }}/lib/{{> tagnamePartial }}.element.ts',
          templateFile: 'plop-templates/component.element.ts.hbs',
        },
        {
          type: 'add',
          path: 'packages/{{> tagnamePartial }}/lib/{{> tagnamePartial }}.test.ts',
          templateFile: 'plop-templates/component.test.ts.hbs',
        },
        {
          type: 'add',
          path: 'packages/{{> tagnamePartial }}/lib/{{> tagnamePartial }}.story.ts',
          templateFile: 'plop-templates/component.story.ts.hbs',
        },
        
        // Package configuration files
        {
          type: 'add',
          path: 'packages/{{> tagnamePartial }}/package.json',
          templateFile: 'plop-templates/package.json.hbs',
        },
        {
          type: 'add',
          path: 'packages/{{> tagnamePartial }}/README.md',
          templateFile: 'plop-templates/README.md.hbs',
        },
        {
          type: 'add',
          path: 'packages/{{> tagnamePartial }}/rollup.config.js',
          templateFile: 'plop-templates/rollup.config.js.hbs',
        },
  
        // Update the main library index file to export the new component
        {
          type: 'append',
          path: './packages/theme-engine/lib/index.ts',
          template:
            "export * from '@theme-engine-ui/{{> tagnamePartial }}/lib/';",
        },
      ],
    });
  };
  