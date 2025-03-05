'use client'
import { Active, DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { ToolbarType } from "./type/ToolbarType";
import { useMemo, useState } from "react";
import BuilderToolbar from "./toolbar/BuilderToolbar";
import { FaBuffer } from "react-icons/fa6";
import { BsLayoutThreeColumns } from "react-icons/bs";
import { FiMove } from "react-icons/fi";
import BuilderContent from "./BuilderContent";
import { TreeNode, TreeType } from "./core/TreeNode";

export default function Builder() {
	const [active, setActive] = useState<Active>();

	const [toolbar, setToolbar] = useState<ToolbarType>({
		coordinate: {
			x: 0,
			y:100
		},
		tools: [
			{
				name: 'Add Element',
				icon: FaBuffer,
				type: 'AddElement',
				addons: [
					{
						name: 'Row',
						group: 'Layout',
						icon: BsLayoutThreeColumns,
						classes: {
							height: 'min-h-20',
							padding: 'pt-2 pb-2'
						}
					},
					{
						name: 'Col',
						group: 'Layout',
						icon: BsLayoutThreeColumns
					},
				]
			},
			{
				name: 'Layout',
				icon: FaBuffer,
				type: 'Layout',
				addons: [
					{
						name: 'Row',
						group: 'Layout',
						icon: BsLayoutThreeColumns,
						component: ''
					}
				]
			}
		]
	});

	const [data, setData] = useState<TreeType>({
		id: 'root',
		type: 'Root'
	});

	const treeNode = useMemo<TreeNode>(() => {
		return new TreeNode(data, setData);
	}, []);

	const onDragStart = (e:DragStartEvent) => {
		setActive(e.active);
	}

	const onDragEnd = (e:DragEndEvent) => {
		if (e.active.id === 'toolbar' && toolbar.coordinate) {
			setToolbar({...toolbar, coordinate: {
				x: toolbar.coordinate.x + e.delta.x,
				y: toolbar.coordinate.y + e.delta.y
			}});
		}

		if (e.active?.data?.current?.group == 'addon') {
			treeNode.addNode(e.over?.data?.current?.path, {
				id: '',
				type: e.active?.data?.current?.type,
				classes: e.active?.data?.current?.classes
			})
		}
		console.log(e.active, e.over)
	}

	const getDragOverLay = () => {
		if (active && active.id === 'toolbar') {
			return null;
		}

		return (
			<DragOverlay>
				<div className="w-44 bg-blue-400 p-2 rounded cursor-pointer">
					<FiMove size={40}/>
				</div>
			</DragOverlay>
		)
	}

	return (
		<DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
			<BuilderToolbar coordinate={toolbar.coordinate} tools={toolbar.tools}/>
			{getDragOverLay()}
			<BuilderContent data={data}/>
		</DndContext>
	)
}