import { FC } from "react";
import { Button, Grid, Popover } from "@nextui-org/react";
import EditableToggle from "./EditableToggle";
import PublishDrawing from "./PublishDrawing";
import { HexColorPicker } from "react-colorful";
import { useCanvas } from "../state/context";
import { setBrushColor } from "../state/reducer";
import * as R from 'ramda'

const ToolboxComponent: FC<{
    css?: any,
    editable: boolean,
    setEditable: (editable: boolean) => void,
    onPublishClick: () => void,
    onClearCanvas: () => void,
    onPublishNFT: () => void
}> = ({ css, editable, setEditable, onPublishClick, onClearCanvas, onPublishNFT }) => {
    const { state, dispatch } = useCanvas()

    const { brush: { color } } = state

    return <Grid.Container gap={2} css={css}>
        <Grid>
            <EditableToggle editable={editable} setEditable={setEditable} />
        </Grid>
        <Grid alignItems="center" css={{ display: 'flex' }}>
            <PublishDrawing onPublishClick={onPublishClick} />
        </Grid>
        <Grid alignItems="center" css={{ display: 'flex' }}>
            <Button onClick={onPublishNFT}>Publish as NFT</Button>
        </Grid>
        <Grid alignItems="center" css={{ display: 'flex' }}>
            <Button onClick={onClearCanvas}>Clear Canvas</Button>
        </Grid>
        <Grid alignItems="center" css={{ display: 'flex' }}>
            <Popover>
                <Popover.Trigger>
                    <Button css={{ backgroundColor: color }}>{color}</Button>
                </Popover.Trigger>
                <Popover.Content>
                    <HexColorPicker color={color} onChange={R.compose(dispatch, setBrushColor)} />
                </Popover.Content>
            </Popover>
        </Grid>
    </Grid.Container>
}

export default ToolboxComponent