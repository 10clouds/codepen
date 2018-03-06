module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		"eslint:recommended",
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
		"react"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
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
		"react/react-in-jsx-scope":"error"
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
