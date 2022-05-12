import { Canvas } from "fabric/fabric-impl"

export enum ActionType {
    SetCanvasElement,
    SetCanvasObject,
    SetNonEditable,
    SetBrushColor,
    SetBrushThickness,
    SetPublishCanvasResult,
    InitSplashLoading,
    IncrementSplashLoading
}

export interface SetCanvasObject {
    type: ActionType.SetCanvasObject
    payload: Canvas
}

export interface SetCanvasElement {
    type: ActionType.SetCanvasElement
    payload: HTMLCanvasElement
}

export interface SetNonEditable {
    type: ActionType.SetNonEditable
    payload: any[]
}

export interface SetBrushColor {
    type: ActionType.SetBrushColor
    payload: string
}

export interface SetBrushThickness {
    type: ActionType.SetBrushThickness
    payload: number
}

export interface SetPublishCanvasResult {
    type: ActionType.SetPublishCanvasResult
    payload: boolean
}

export interface IncrementSplashLoading {
    type: ActionType.IncrementSplashLoading
    payload: number
}

export interface InitSplashLoading {
    type: ActionType.InitSplashLoading
    payload: number
}

export type CanvasActions = SetCanvasObject | SetCanvasElement | SetNonEditable | SetBrushColor | SetBrushThickness | SetPublishCanvasResult | InitSplashLoading | IncrementSplashLoading
