const packages = ['react', 'react-dom']

function packageFilter(json) {
  if (!packages.includes(json.name)) return json
  return {...json, main: require.resolve(json.name)}
}

/**
 * This overrides the defualt jest resolver to load the packages listed 
 * above from the local `node_modules` directory rather than from the any symlinked location.
 * 
 * @see https://jestjs.io/docs/en/configuration#resolver-string
 */

module.exports = ( request, options ) => {
  return options.defaultResolver( request, { ...options, packageFilter})
}

