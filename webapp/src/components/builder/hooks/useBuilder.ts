import { useContext } from "react"
import BuilderContext from "../core/BuilderContext"

export default function useBuilder() {
	const context = useContext(BuilderContext);

	return {
		data: context.data,
		setData: context.setData,
		treeNode: context.treeNode
	}
}