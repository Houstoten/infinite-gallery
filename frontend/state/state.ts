import { Canvas } from "fabric/fabric-impl"

export interface CanvasState {
    canvasObject?: Canvas
    canvasElement?: HTMLCanvasElement
    nonEditable: any[]
    nfts: any[]
    brush: Brush
    splashLoading: SplashLoading
}

export interface SplashLoading {
    initial: number
    progress: number
    loading: boolean
}

export interface Brush {
    color: string
    thickness: number
}

export const initialCanvasState: CanvasState = {
    nonEditable: [],
    nfts: [],
    brush: {
        color: "#b32aa9",
        thickness: 5
    },
    splashLoading: {
        initial: 0,
        progress: 0,
        loading: true
    } 
}
