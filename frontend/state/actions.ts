import { Canvas } from "fabric/fabric-impl"
import { RefObject } from "react"

export enum ActionType {
    SetCanvasRef,
    SetCanvasObject,
    SetNonEditable,
    SetBrushColor,
    SetBrushThickness
}

export interface SetCanvasObject {
    type: ActionType.SetCanvasObject
    payload: Canvas
}

export interface SetCanvasRef {
    type: ActionType.SetCanvasRef
    payload: RefObject<HTMLCanvasElement>
}

export interface SetNonEditable {
    type: ActionType.SetNonEditable
    payload: string[]
}

export interface SetBrushColor {
    type: ActionType.SetBrushColor
    payload: string
}

export interface SetBrushThickness {
    type: ActionType.SetBrushThickness
    payload: number
}

export type CanvasActions = SetCanvasObject | SetCanvasRef | SetNonEditable | SetBrushColor | SetBrushThickness
