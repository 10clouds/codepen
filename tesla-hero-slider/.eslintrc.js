module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		'prettier',
		'prettier/react',
		"plugin:react/recommended"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"prettier"
	],
	"rules": {
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		],
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		"react/react-in-jsx-scope":"error",
		'prettier/prettier': ['error', { singleQuote: true, parser: 'flow' }],
	},
	"settings": {
		"react": {
			"createClass": "createReactClass",
			"pragma": "React",
			"version": "16.2",
		},
		"propWrapperFunctions": ["forbidExtraProps"]
	}
};
