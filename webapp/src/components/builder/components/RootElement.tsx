import { ReactNode, useMemo } from "react"
import { TreeNode, TreeType } from "../core/TreeNode"
import { useDroppable } from "@dnd-kit/core"

interface Props {
	data: TreeType,
	path: string,
	children: ReactNode
}

export default function RootElement(props: Props) {
	const classes = useMemo(() => {
		if (props.data && props.data.classes) {
			return  Object.values(props.data.classes).join(' ').concat(' ')
		} else {
			return '';
		}

	}, []);

	return (
		<div className={`min-h-screen pb-5${classes}`}>
			Root {props.path}
			{props.children}
		</div>
	)
}