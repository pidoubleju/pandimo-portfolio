/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular-imports',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'data-and-helpers-stay-independent',
      severity: 'error',
      from: { path: '^src/(lib|data)/' },
      to: { path: '^src/(pages|layouts|components)/' },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    exclude: { path: '(^|/)(node_modules|dist|\\.astro)/' },
    tsConfig: { fileName: 'tsconfig.json' },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      extensions: ['.ts', '.js', '.json'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },
  },
};
