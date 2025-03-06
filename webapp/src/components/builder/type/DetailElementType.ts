import { TreeType } from "../core/TreeNode";

export interface DetailElementType {
	element: TreeType,
	path:string,
	isOpen:boolean,
	coordinate: {
		x: number,
		y: number
	},
}