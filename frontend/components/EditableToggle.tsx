import { FC } from "react";
import { Button, Grid, css, Switch, Text } from "@nextui-org/react";

const EditableToggle: FC<{ editable: boolean, setEditable: (editable: boolean) => void }> = ({ editable, setEditable }) => {

    return <Grid.Container gap={2}>
        <Grid alignItems="center" css={{display: 'flex'}}>
            <Text>Editable Canvas</Text>
        </Grid>
        <Grid alignItems="center" css={{display: 'flex'}}>
            <Switch checked={editable} onChange={ev => setEditable(ev.target.checked)} />
        </Grid>
    </Grid.Container>
}

export default EditableToggle