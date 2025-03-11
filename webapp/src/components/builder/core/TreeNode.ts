export interface TreeType {
	id: string,
	type:string,
	children?: TreeType[],
	classes?:any,
}

export class TreeNode {
	_data:TreeType | undefined
	_updateView:(data?:any) =>  void

	constructor(data:TreeType, updateView:(data?:any) => void) {
		this._data = data;
		this._updateView = updateView;
	}

	updateView() {
		this._updateView({...this._data});
	}

	getId():string {
		if (this._data && this._data.id) {
			return this._data.id;
		}

		return '';
	}

	addNode(path:string | undefined, node: TreeType){
		const parent:TreeType | undefined = eval(`this._data${path}`);
		node.id = this.generateId();

		if (parent) {
			if (parent.children) {
				parent.children.push(node);
			} else {
				parent.children = [node];
			}
		}

		this._updateView({...this._data})
	}

	getParentPath(path:string) {
		const pathArr= path.split('.');

		return pathArr.filter((value, idx) => idx != pathArr.length - 1).join('.')
	}

	moveNode(from:string, to:string) {
		const fromNode = eval(`this._data${from}`);
		const parentPath = this.getParentPath(from);
		const parentNode:TreeType =  eval(`this._data${parentPath}`);

		if (parentNode && parentNode.children) {
			parentNode.children = parentNode.children.filter(item => item != fromNode)
		}

		const toNode:TreeType | undefined = eval(`this._data${to}`);

		if (toNode) {
			if (toNode.children) {
				toNode.children.push(fromNode);
			} else {
				toNode.children = [fromNode];
			}
		}

		this._updateView({...this._data});
	}

	swapNode(from:string, to:string) {
		const temp:TreeType | undefined = eval(`this._data${to}`);

		if (temp) {
			eval(`this._data${from} = this._data${to}`);
			eval(`this._data${to} = temp`);
		}

		this.updateView();
	}

	removeNode(path:string) {
		console.log(path)
	}

	updateNode(path:string, data: any){
		console.log(path, data)
	}

	generateId() {
		let d = new Date().getTime(); 
		let d2 = (performance && performance.now && (performance.now()*1000)) || 0; // Timestamp for browsers with high-precision

		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		  let r = Math.random() * 16; // random number
		  if (d > 0){ // Use timestamp until depleted
			r = (d + r)%16 | 0;
			d = Math.floor(d/16);
		  } else { // Use high-precision time if available
			r = (d2 + r)%16 | 0;
			d2 = Math.floor(d2/16);
		  }
		  return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
	}
}