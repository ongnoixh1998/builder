'use client'
import { Active, DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, useSensor } from "@dnd-kit/core";
import { ToolbarType } from "./type/ToolbarType";
import { useState } from "react";
import { FaBuffer } from "react-icons/fa6";
import { BsLayoutThreeColumns } from "react-icons/bs";
import { FiMove } from "react-icons/fi";
import BuilderContent from "./BuilderContent";
import BuilderToolbar from "./BuilderToolbar";
import useBuilder from "./hooks/useBuilder";

export default function Builder() {
	const builder = useBuilder();
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
				categories: [
					{
						category: 'Layout',
						title: 'Layout',
						addons: [
							{
								name: 'Row',
								group: 'Layout',
								icon: BsLayoutThreeColumns,
								classes: {
									grid:'grid grid-cols-2 gap-1',
									height: 'min-h-20',
									padding: 'pt-10 pb-10'
								}
							},
							{
								name: 'Col',
								group: 'Layout',
								icon: BsLayoutThreeColumns,
								classes: {
									height: 'min-h-20 bg-black/40',
									padding: 'pt-10 pb-10'
								}
							},
						]
					}

				]
			},
			{
				name: 'Layout',
				icon: FaBuffer,
				type: 'Layout',
			}
		]
	});

	const onDragStart = (e:DragStartEvent) => {
		setActive(e.active);
	}

	const onDragEnd = (e:DragEndEvent) => {
		if (e.active.id === 'toolbar' && toolbar.coordinate) {
			setToolbar({...toolbar, coordinate: {
				x: toolbar.coordinate.x + e.delta.x,
				y: toolbar.coordinate.y + e.delta.y
			}});

			return;
		}

		if (e.active?.data?.current?.group == 'addon') {
			builder.treeNode?.addNode(e.over?.data?.current?.path, {
				id: '',
				type: e.active?.data?.current?.type,
				classes: e.active?.data?.current?.classes
			});

			return;
		}
		console.log(e.active, e.over);

		// if (e.active?.data?.current && e.over?.data?.current && e.active?.data?.current?.sortable?.containerId != e.over?.data?.current?.sortable?.containerId) {
		// 	builder.treeNode?.moveNode(e.active?.data?.current?.path, e.over?.data?.current?.path);

		// 	return;
		// }

		if (e.active?.data?.current && e.over?.data?.current && e.active?.data?.current?.sortable?.containerId == e.over?.data?.current?.sortable?.containerId) {
			builder.treeNode?.swapNode(e.active?.data?.current?.path, e.over?.data?.current?.path)
		}
	}

	const getDragOverLay = () => {
		if (active && (active.id === 'toolbar' || active.id === 'DetailElement')) {
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

	const mouseSensor = useSensor(MouseSensor, {
		// Require the mouse to move by 50 pixels before activating
		activationConstraint: {
		  distance: 50,
		},
	});

	return (
		<DndContext onDragEnd={onDragEnd} onDragStart={onDragStart} sensors={[mouseSensor]}>
			<BuilderToolbar coordinate={toolbar.coordinate} tools={toolbar.tools}/>
			{getDragOverLay()}
			<BuilderContent data={builder.data}/>
		</DndContext>
	)
}