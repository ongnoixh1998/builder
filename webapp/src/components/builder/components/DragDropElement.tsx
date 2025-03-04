import BuilderElement from "../core/BuilderElement"
import { TreeType } from "../core/TreeNode"

interface Props {
	data: TreeType
}

export default function DragDropElement(props: Props) {
	const WithElement = (data:TreeType) => {
		const El = BuilderElement[data.type];
		const children = data.children?.map((child) => {
			return DragDropElement({data: child})
		});

		return (
			<El {...{data: {...data}}}>
				{children}
			</El>
		)
	}

	return (
		<>
			{WithElement(props.data)}
		</>
	)
}