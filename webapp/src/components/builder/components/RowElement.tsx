import { memo, ReactNode, useMemo, useRef } from "react"
import { TreeNode, TreeType } from "../core/TreeNode"
import { useDroppable } from "@dnd-kit/core";

interface Props {
	data: TreeType,
	path: string,
	children: ReactNode
}

export default memo(function RowElement(props: Props) {
	const ref = useRef(null);

	const classes = useMemo(() => {
		if (props.data && props.data.classes) {
			return  Object.values(props.data.classes).join(' ')
		} else {
			return '';
		}

	}, []);

	return (
		<div ref={ref} className={`${classes}`}>
			{props.children}
		</div>
	);
})