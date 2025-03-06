import { useDraggable } from "@dnd-kit/core";

interface Props {
	name: string,
	icon: any,
	component?: any,
	classes?: any
}

export default function Addon(props: Props) {
	const drag = useDraggable({
		id: props.name,
		data: {
			group: 'addon',
			type: props.name,
			classes: props.classes

		}
	});
	
	return (
		<div ref={drag.setNodeRef} {...drag.attributes} {...drag.listeners} className="flex gap-1 items-center p-1">
			<props.icon size={25}/>
			<span className="select-none">{props.name}</span>
		</div>
	)
}