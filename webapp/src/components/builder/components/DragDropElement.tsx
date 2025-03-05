import { useDroppable } from "@dnd-kit/core";
import BuilderElement from "../core/BuilderElement"
import { TreeType } from "../core/TreeNode"
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

interface Props {
	data: TreeType,
	path: string,
	children: ReactNode
}

export default function DragDropElement(props: Props) {
	const [hover, setHover] = useState(false);
	const [ref, setRef] = useState<any>(null);

	const documentClick = (e:any) => {
		if (e.target.parentNode != ref) {
			setHover(false);
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

	const isOver = drop.isOver ? ' border border-red-400 ' : ''

	const handleClick = (e:React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setHover(true);
	}

	const isHover = useMemo(() => {
		return hover ? ' border border-cyan-400 ' : ''
	}, [hover]);

	return (
		<div ref={(e) => {
			drop.setNodeRef(e);
			setRef(e);
		} } className={`h-auto${isOver}${isHover}`} onClick={handleClick}>
			{props.children}
		</div>
	)
}