import React, { FC, ReactElement, useContext, useReducer } from "react";
import { CanvasActions } from "./actions";
import { canvasReducer } from "./reducer";
import { CanvasState, initialCanvasState } from "./state";

export const CanvasContext = React.createContext<{
    state: CanvasState,
    dispatch: React.Dispatch<CanvasActions>
}>({
    state: initialCanvasState,
    dispatch: () => null
})

export const CanvasContextProvider: FC<{ children: ReactElement }> = ({ children }) => {
    const [state, dispatch] = useReducer(canvasReducer, initialCanvasState)

    return <CanvasContext.Provider value={{ state, dispatch }}>
        {children}
    </CanvasContext.Provider>
}

export const useCanvas = (): { state: CanvasState, dispatch: React.Dispatch<CanvasActions> } => {
    const ctxtValue = useContext(CanvasContext)

    return ctxtValue
}