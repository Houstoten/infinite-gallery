import { Canvas } from "fabric/fabric-impl"

export interface CanvasState {
    canvasObject?: Canvas
    canvasElement?: HTMLCanvasElement
    nonEditable?: string[]
    brush: Brush
}

export interface Brush {
    color: string
    thickness: number
}

export const initialCanvasState: CanvasState = {
    nonEditable: [],
    brush: {
        color: "#b32aa9",
        thickness: 5
    }
}
