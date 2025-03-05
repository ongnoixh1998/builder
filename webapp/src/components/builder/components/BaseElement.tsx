import BuilderElement from "../core/BuilderElement"
import { TreeType } from "../core/TreeNode"
import DragDropElement from "./DragDropElement";

interface Props {
	data?: TreeType,
	path: string
}

export default function BaseElement(props: Props) {
	const WithElement = (data?:TreeType) => {
		if (!data)return null;

		const El = BuilderElement[data.type];
		const children = data.children?.map((child, idx) => {
			return BaseElement({data: child, path: props.path + '.children[' + idx +']'})
		});

		return (
			<DragDropElement {...{data: {...data}, path: props.path}} key={props.path}>
				<El {...{data: {...data}, path: props.path}} key={props.path}>
					{children}
				</El>
			</DragDropElement>

		)
	}

	return WithElement(props.data);
}