import { memo } from "react";
import BuilderElement from "../core/BuilderElement"
import { TreeType } from "../core/TreeNode"
import DragDropElement from "./DragDropElement";
import { SortableContext } from "@dnd-kit/sortable";

interface Props {
	data?: TreeType,
	path: string
}

export default memo(function BaseElement(props: Props) {
	const WithElement = (data?:TreeType) => {
		if (!data)return null;

		const El = BuilderElement[data.type];
		const children = data.children?.map((child, idx) => {
			return BaseElement({data: child, path: props.path + '.children[' + idx +']'})
		});

		return (
			<DragDropElement {...{data: data, path: props.path}} key={props.path}>
				<El {...{data: data, path: props.path}} key={props.path}>
					{
							data.children
						?	<SortableContext items={data.children ? data.children.map(child => child.id): []}>
								{children}
							</SortableContext>
						:	null
					}

				</El>
			</DragDropElement>

		);
	}

	return WithElement(props.data);
})