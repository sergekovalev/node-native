const TOKENS = require('../tokens');

const switchLiteralType = (raw) => {
	if(/^\d+$/.test(raw)) {
		return TOKENS.INTEGER;
	}
	
	return TOKENS.UNDEFINED;
}

const migrate = (tree) => {
	if(!tree) return;
	
	for(const [k, v] of Object.entries(tree)) {
		if(typeof v === 'object') {
			if(Array.isArray(v)) {
				v.forEach(migrate);
			} else {
				migrate(v);
			}
		} else if(k === 'start' || k === 'end') {
			delete tree[k];
		} else if(k === 'type' && v === 'Literal') {
			tree.varType = switchLiteralType(tree.raw);
		}
	}
}

const make = (tree) => {
  migrate(tree);
  return tree;
}

module.exports = {
  make
};