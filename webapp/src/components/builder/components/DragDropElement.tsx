import { useDroppable } from "@dnd-kit/core";
import { TreeType } from "../core/TreeNode"
import { ReactNode, useEffect, useMemo, useState } from "react";

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

	const isHover = useMemo(() => {
		return props.data.id !== 'root' && hover ? " before:content-[''] relative before:-z-10 before:absolute before:w-full before:h-full before:p-2 before:border-4 before:border-dotted before:border-amber-600 " : ""
	}, [hover]);

	const isActive= useMemo(() => {
		return props.data.id !== 'root' && active ? " before:content-[''] relative before:-z-10 before:absolute before:w-full before:h-full before:p-2 before:border-4 before:border-dotted before:border-amber-600 " : ""
	}, [active]);

	return (
		<div ref={(e) => {
			drop.setNodeRef(e);
			setRef(e);
		} } className={`h-auto${isOver()}${isHover}${isActive} z-10`} onClick={handleClick} onMouseOver={(e) => {
			if (e.target == e.currentTarget.firstChild) {
				setHover(true);
			} else {
				setHover(false);
			}
		}} onMouseLeave={() => {
			setHover(false)
		}}>
			{props.children}
		</div>
	)
}