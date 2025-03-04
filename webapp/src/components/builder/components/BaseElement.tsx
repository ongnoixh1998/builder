import BuilderElement from "../core/BuilderElement"
import { TreeType } from "../core/TreeNode"

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
			<El {...{data: {...data}, path: props.path}} key={props.path}>
				{children}
			</El>
		)
	}

	return WithElement(props.data);
}