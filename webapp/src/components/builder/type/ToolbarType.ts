export interface AddonType {
	name: string,
	icon: any,
	group: string,
	component?: any
}

export interface Tool {
	name: string,
	icon: any,
	type:string,
	addons?: AddonType[]
}

export interface ToolbarType {
	coordinate?: {
		x: number,
		y: number
	},
	tools?: Tool[]
}