'use client'
import { useMemo, useState } from "react";
import { TreeNode, TreeType } from "./core/TreeNode";
import BuilderContext from "./core/BuilderContext";
import Builder from "./Builder";

export default function WrapperBuilder() {
	const [data, setData] = useState<TreeType>({
		id: 'root',
		type: 'Root'
	});

	const treeNode = useMemo(() => {
		return new TreeNode(data, setData);
	}, []);

	return (
		<BuilderContext.Provider value={{
			data: data,
			treeNode: treeNode,
			setData: setData
		}}>
			<Builder/>
		</BuilderContext.Provider>
	)
}