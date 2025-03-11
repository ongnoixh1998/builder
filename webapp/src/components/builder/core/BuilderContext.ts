import { createContext } from "react";
import { TreeNode, TreeType } from "./TreeNode";
import { DetailElementType } from "../type/DetailElementType";

interface BuilderContextType {
	data: TreeType,
	treeNode:TreeNode | null,
	setData:(data: TreeType) => void,
	detailElement?:DetailElementType,
	setDetailElement:(data:DetailElementType) => void,
	hideDetailElement:() => void,
	showDetailElement:() => void
}

const BuilderContext = createContext<BuilderContextType>({
	data: {
		id: 'Root',
		type: 'Root'
	},
	treeNode: null,
	setData: (data:TreeType) => {
		console.log(data)
	},
	setDetailElement: (data:DetailElementType) => {

	},
	hideDetailElement: () => {},
	showDetailElement: () => {}
});

export default BuilderContext;