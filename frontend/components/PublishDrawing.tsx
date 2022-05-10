import { FC } from "react";
import { Button } from "@nextui-org/react";

const PublishDrawing: FC<{ onPublishClick: () => void }> = ({ onPublishClick }) => {

    return <Button onClick={onPublishClick}>Publish drawing</Button>
}

export default PublishDrawing