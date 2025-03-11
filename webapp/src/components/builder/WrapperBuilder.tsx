'use client'
import { useMemo, useState } from "react";
import { TreeNode, TreeType } from "./core/TreeNode";
import BuilderContext from "./core/BuilderContext";
import Builder from "./Builder";
import { DetailElementType } from "./type/DetailElementType";

export default function WrapperBuilder() {
	const [data, setData] = useState<TreeType>({
		id: 'root',
		type: 'Root'
	});
	const [detailElement, setDetailElement] = useState<DetailElementType>({	
		element: null,
		path: '',
		isOpen: false,
		coordinate: {
			x: 0,
			y: 0
		}
	});

	const treeNode = useMemo(() => {
		return new TreeNode(data, setData);
	}, []);

	const showDetailElement = () => {

	}

	const hideDetailElement = () => {

	}

	return (
		<BuilderContext.Provider value={{
			data: data,
			treeNode: treeNode,
			setData: setData,
			setDetailElement: setDetailElement,
			showDetailElement: showDetailElement,
			hideDetailElement: hideDetailElement

		}}>
			<Builder/>
		</BuilderContext.Provider>
	)
}