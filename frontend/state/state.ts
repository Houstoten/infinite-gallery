import { Canvas } from "fabric/fabric-impl"
import { RefObject } from "react"

export interface CanvasState {
    canvasObject?: Canvas
    canvasRef?: RefObject<HTMLCanvasElement>
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
