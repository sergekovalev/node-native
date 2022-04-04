import TOKENS from '../tokens';

const switchLiteralType = (raw) => {
	if(/^\d+$/.test(raw)) {
		return TOKENS.INTEGER;
	} else if(/^\d*\.\d+$/.test(raw)) {
		return TOKENS.FLOAT;
	} else if(/^(true)|(false)$/.test(raw)) {
		return TOKENS.BOOLEAN;
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

export default function make(tree) {
  migrate(tree);
  return tree;
}