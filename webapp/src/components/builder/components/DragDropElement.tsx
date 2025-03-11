import { useDroppable } from "@dnd-kit/core";
import { TreeType } from "../core/TreeNode"
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

interface Props {
	data: TreeType,
	path: string,
	children: ReactNode
}

export default function DragDropElement(props: Props) {
	const [active, setActive] = useState(false);
	const [hover, setHover] = useState(false);
	const [ref, setRef] = useState<any>(null);

	const documentClick = (e:any) => {
		if (e.target.parentNode != ref) {
			setActive(false);
		}
	}

	useEffect(() => {
		document.addEventListener('click', documentClick)

		return () => {
			document.removeEventListener('click', documentClick)
		}
	}, [ref]);

	const drop = useDroppable({
		id: props.data.id,
		data: {
			data: {...props.data},
			path: props.path
		}
	});

	const drag = useSortable({
		id: props.data.id,
		data: {
			data: {...props.data},
			path: props.path
		}
	});

	const dragStyle = {
		transform: CSS.Transform.toString(drag.transform)
	};

	const isOver = () => {
		if (drop.active?.id !== 'toolbar' && drop.active?.id !== 'DetailElement') {
			return drop.isOver ? " before:content-[''] relative before:-z-10 before:absolute before:w-full before:h-full before:p-2 before:border-4 before:border-dotted before:border-amber-600 " : ''
		} else {
			return '';
		}
	}

	const handleClick = (e:React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setActive(true);
	}

	const style= useMemo(() => {
		if (active) {
			return 'block border-blue-500'
		} else if (hover) {
			return 'block border-red-500'
		}

		return 'hidden'
	}, [hover, active]);

	return (
		<div {...drag.attributes} {...drag.listeners} style={dragStyle} ref={(e) => {
			drop.setNodeRef(e);
			drag.setNodeRef(e);
			setRef(e);
		} } className={`h-auto${isOver()} z-10 wrap relative`} data-id={props.data.id} onClick={handleClick} onMouseOver={(e) => {
			const targetEl = e.target as HTMLElement;
			const curEl = e.currentTarget as HTMLElement;
			const wrap = targetEl.closest('.wrap');

			if (targetEl == curEl.firstChild || (wrap?.getAttribute('data-id') == curEl.getAttribute('data-id'))) {
				setHover(true);
			} else {
				setHover(false);
			}

		}} onMouseLeave={() => {
			setHover(false)
		}}>
			{props.children}
			{
					props.data.id != 'root'
				?	<div  data-id={props.data.id} className={`${style} border w-full h-full absolute top-0 left-0`}>

					</div>
				:	null
			}

		</div>
	)
}