import { ReactNode } from "react"
import { TreeNode, TreeType } from "../core/TreeNode"
import { useDroppable } from "@dnd-kit/core";

interface Props {
	data: TreeType,
	path: string,
	children: ReactNode
}

export default function ColElement(props: Props) {
	const drop = useDroppable({
		id: props.data.id,
		data: {
			data: {...props.data},
			path: props.path
		}
	});

	return (
		<div ref={(ref) => {
			drop.setNodeRef(ref)
		}}>
			Col {props.path}
			{props.children}
		</div>
	)
}