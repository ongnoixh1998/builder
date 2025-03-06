import { createContext } from "react";
import { TreeNode, TreeType } from "./TreeNode";

interface BuilderContextType {
	data: TreeType,
	treeNode:TreeNode | null,
	setData:(data: TreeType) => void
}

const BuilderContext = createContext<BuilderContextType>({
	data: {
		id: 'Root',
		type: 'Root'
	},
	treeNode: null,
	setData: (data:TreeType) => {
		console.log(data)
	}
});

export default BuilderContext;