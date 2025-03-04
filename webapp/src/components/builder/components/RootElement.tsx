import { ReactNode } from "react"
import { TreeNode, TreeType } from "../core/TreeNode"
import { useDroppable } from "@dnd-kit/core"

interface Props {
	data: TreeType,
	path: string,
	children: ReactNode
}

export default function RootElement(props: Props) {
	const drop = useDroppable({
		id: props.data.id,
		data: {
			data: {...props.data},
			path: props.path
		}
	});

	return (
		<div ref={drop.setNodeRef} className="h-full">
			Root {props.path}
			{props.children}
		</div>
	)
}