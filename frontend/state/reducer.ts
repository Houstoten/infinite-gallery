import { fabric } from "fabric";
import { RefObject } from "react";
import { ActionType, CanvasActions, SetBrushColor, SetBrushThickness, SetCanvasRef, SetNonEditable } from "./actions";
import { CanvasState } from "./state";

export const canvasReducer = (state: CanvasState, action: CanvasActions): CanvasState => {
    switch (action.type) {
        case ActionType.SetCanvasRef:
            return {
                ...state,
                canvasRef: action.payload,
                canvasObject: new fabric.Canvas(action.payload.current ?? 'canvas', {
                    backgroundColor: 'rgba(0,0,0,0)',
                    isDrawingMode: false,
                })
            }
        case ActionType.SetNonEditable:
            return {
                ...state,
                nonEditable: action.payload
            }
        case ActionType.SetBrushColor:
            return {
                ...state,
                brush: {
                    ...state.brush,
                    color: action.payload
                }
            }
        case ActionType.SetBrushThickness:
            return {
                ...state,
                brush: {
                    ...state.brush,
                    thickness: action.payload
                }
            }
        default:
            return state

    }
}

export const setCanvas = (canvasRef: RefObject<HTMLCanvasElement>): SetCanvasRef => ({
    type: ActionType.SetCanvasRef,
    payload: canvasRef
})

export const setNonEditable = (nonEditable: string[]): SetNonEditable => ({
    type: ActionType.SetNonEditable,
    payload: nonEditable
})

export const setBrushColor = (color: string): SetBrushColor => ({
    type: ActionType.SetBrushColor,
    payload: color
})

export const setBrushThickness = (thickness: number): SetBrushThickness => ({
    type: ActionType.SetBrushThickness,
    payload: thickness
})
