import { FC, useState } from "react";
import { Button, Grid, Popover, css } from "@nextui-org/react";
import EditableToggle from "./EditableToggle";
import PublishDrawing from "./PublishDrawing";
// import { SketchPicker } from 'react-color'
import { HexColorPicker } from "react-colorful";

const ToolboxComponent: FC<{
    css?: any,
    editable: boolean,
    setEditable: (editable: boolean) => void,
    onPublishClick: () => void,
    onClearCanvas: () => void,
    onLoadGeneralCanvas: () => void,
}> = ({ css, editable, setEditable, onPublishClick, onClearCanvas, onLoadGeneralCanvas }) => {
    const [color, setColor] = useState("#b32aa9");

    return <Grid.Container gap={2} css={css}>
        <Grid>
            <EditableToggle editable={editable} setEditable={setEditable} />
        </Grid>
        <Grid alignItems="center" css={{ display: 'flex' }}>
            <PublishDrawing onPublishClick={onPublishClick} />
        </Grid>
        <Grid alignItems="center" css={{ display: 'flex' }}>
            <Button onClick={onClearCanvas}>Clear Canvas</Button>
        </Grid>
        <Grid alignItems="center" css={{ display: 'flex' }}>
            {/* <Button onClick={onLoadGeneralCanvas}>Load Saved</Button> */}
            <Popover>
                <Popover.Trigger>
                    <Button css={{ backgroundColor: color }}>Choose Color</Button>
                </Popover.Trigger>
                <Popover.Content>
                    <HexColorPicker color={color} onChange={setColor} />
                </Popover.Content>
            </Popover>

        </Grid>
    </Grid.Container>
}

export default ToolboxComponent