
import {Button, Result} from "antd";
import {withRouter} from "react-router-dom";

const NoMatch = props => {
    return <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={() => props.history.push('/')} type="primary">Back To Main</Button>}
    />
};

export default withRouter(NoMatch);
