import { FC } from "react";
import { Button, Grid, css } from "@nextui-org/react";
import EditableToggle from "./EditableToggle";
import PublishDrawing from "./PublishDrawing";

const ToolboxComponent: FC<{ 
    css?: any, 
    editable: boolean, 
    setEditable: (editable: boolean) => void, 
    onPublishClick: () => void,
    onClearCanvas: () => void,
    onLoadGeneralCanvas: () => void,
}> = ({ css, editable, setEditable, onPublishClick, onClearCanvas, onLoadGeneralCanvas }) => {

    return <Grid.Container gap={2} css={css}>
        <Grid>
            <EditableToggle editable={editable} setEditable={setEditable} />
        </Grid>
        <Grid alignItems="center" css={{display: 'flex'}}>
            <PublishDrawing onPublishClick={onPublishClick} />
        </Grid>
        <Grid alignItems="center" css={{display: 'flex'}}>
            <Button onClick={onClearCanvas}>Clear Canvas</Button>
        </Grid>
        <Grid alignItems="center" css={{display: 'flex'}}>
            <Button onClick={onLoadGeneralCanvas}>Load Saved</Button>
        </Grid>
    </Grid.Container>
}

export default ToolboxComponent