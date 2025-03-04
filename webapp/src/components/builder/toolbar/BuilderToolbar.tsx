'use client'
import { useDraggable } from "@dnd-kit/core";
import { Tool, ToolbarType } from "../type/ToolbarType";
import { CSSProperties, useState } from "react";
import { PiDotsSixThin } from "react-icons/pi";
import Addon from "./Addon";

interface Props extends ToolbarType {

}
export default function BuilderToolbar (props: Props) {
	const [showDetail, setShowDetail] = useState<Tool | null>();

	const drag = useDraggable({
		id: 'toolbar'
	});

	const style:CSSProperties | null = {
		transform: drag.transform ? `translate(${drag.transform?.x}px, ${drag.transform?.y}px)` : undefined
	}

	const handleAction = (tool:Tool) => {
		if (tool.type === showDetail?.type) {
			setShowDetail(null);

		} else {
			setShowDetail(tool);
		}
	}

	const getDetailView = () => {
		if (showDetail?.type =='AddElement') {
			return (
				<div className="absolute top-0 rounded translate-x-1 left-full w-64 h-fit bg-sky-500 grid grid-cols-2">
					{
						showDetail.addons?.map((addon, idx) => {
							return (
								<Addon {...addon} key={idx}/>
							)
						})
					}
				</div>
			)
		}

		return null
	}

	return (
		<div className="relative bg-sky-500 w-32 h-fit rounded p-2" style={{...style, top: props.coordinate?.y, left: props.coordinate?.x, position: 'absolute'}}>
			<div className="flex flex-col gap-2" >
				<div ref={drag.setNodeRef} {...drag.listeners} {...drag.attributes} className="border-b flex flex-col items-center justify-center">
					<PiDotsSixThin size={30}/>
				</div>

				{
					props.tools?.map((tool, idx) => {
						return (
							<div className="w-full h-14 border-b last:border-none flex flex-col items-center justify-center cursor-pointer" onClick={() => handleAction(tool)} key={idx}>
								<tool.icon size={30}/>
								<span className="font-bold select-none">{tool.name}</span>
							</div>
						)
					})
				}
			</div>

			{getDetailView()}
		</div>

	)
}