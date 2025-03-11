import { memo, ReactNode, useMemo } from "react"
import { TreeType } from "../core/TreeNode"

interface Props {
	data: TreeType,
	path: string,
	children: ReactNode
}

export default memo(function ColElement(props: Props) {
	const classes = useMemo(() => {
		if (props.data && props.data.classes) {
			return  Object.values(props.data.classes).join(' ')
		} else {
			return '';
		}

	}, []);

	return (
		<div className={`${classes}`}>
			{props.children}
			{props.data.id}
		</div>
	);
})