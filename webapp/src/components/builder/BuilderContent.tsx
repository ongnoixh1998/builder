import BaseElement from "./components/BaseElement"
import { TreeNode, TreeType } from "./core/TreeNode"

interface Props {
	data?: TreeType
}

export default function BuilderContent(props: Props) {
	if (!props.data) return null;

	return (
		<div className="h-full">
			<BaseElement data={props.data} path=""/>
		</div>
	)
}