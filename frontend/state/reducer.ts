import { fabric } from "fabric";
import { ActionType, CanvasActions, SetBrushColor, SetBrushThickness, SetCanvasElement, SetNonEditable } from "./actions";
import { CanvasState } from "./state";
import * as R from 'ramda'

export const canvasReducer = (state: CanvasState, action: CanvasActions): CanvasState => {
    switch (action.type) {
        case ActionType.SetCanvasElement: {

            const canvasObject = new fabric.Canvas(action.payload?? 'canvas', {
                backgroundColor: 'rgba(0,0,0,0)',
                isDrawingMode: false,
            })

            canvasObject.freeDrawingBrush.color = state.brush.color
            canvasObject.freeDrawingBrush.width = state.brush.thickness

            canvasObject.on('mouse:wheel', function (opt) {
                const delta = opt.e.deltaY;
                const zoom = canvasObject.getZoom() ?? 0;

                const calculatedZoom = R.cond([
                    [R.gte(0.8), R.always(0.8)],
                    [R.lte(5), R.always(5)],
                    [R.T, R.identity],
                ])(zoom * 0.999 ** delta)

                canvasObject.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, calculatedZoom);
                opt.e.preventDefault();
                opt.e.stopPropagation();
            });

            const _state = {
                ...state,
                canvasElement: action.payload,
                canvasObject
            }

            return _state
        }
        case ActionType.SetNonEditable: {

            // state.canvasObject?.loadFromJSON(_fabricObject, () => canvasObject?.renderAll(), function (o: any, object: any) {
            //     object.set('selectable', false);
            // })
            return {
                ...state,
                nonEditable: action.payload
            }
        }
        case ActionType.SetBrushColor: {
            state.canvasObject && (state.canvasObject.freeDrawingBrush.color = action.payload)
            return {
                ...state,
                brush: {
                    ...state.brush,
                    color: action.payload
                }
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

export const setCanvas = (canvasElement: HTMLCanvasElement): SetCanvasElement => ({
    type: ActionType.SetCanvasElement,
    payload: canvasElement
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
